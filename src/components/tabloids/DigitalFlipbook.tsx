"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Layers,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabloidIssue } from "@/data/tabloidsData";

interface DigitalFlipbookProps {
  issue: TabloidIssue;
  onSelectIssue?: (issueId: string) => void;
}

interface FlipTransition {
  direction: "next" | "prev";
  underneathLeft: number | null;
  underneathRight: number | null;
  leafFront: number | null;
  leafBack: number | null;
  targetPage: number;
}

// Generate realistic paper rustle sound via Web Audio API
function playPaperSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const duration = 0.16;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.exp(-i / (bufferSize * 0.28));
      channelData[i] = (Math.random() * 2 - 1) * envelope;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1300, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + duration);
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Audio autoplay blocked or unsupported
  }
}

export const DigitalFlipbook: React.FC<DigitalFlipbookProps> = ({ issue }) => {
  // Navigation & state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(14);
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(true);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(10);

  // 3D Flip animation state
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipTransition, setFlipTransition] = useState<FlipTransition | null>(null);

  // Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpreadMode, setIsSpreadMode] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);

  // Cached page images (page number -> data URL)
  const [pageImages, setPageImages] = useState<Record<number, string>>({});
  const renderedPagesRef = useRef<Set<number>>(new Set());
  const renderingInProgressRef = useRef<Set<number>>(new Set());

  // PDF Document reference
  const pdfDocRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  // Responsive mode detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 820) {
        setIsSpreadMode(false);
      } else {
        setIsSpreadMode(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to render a specific page number into memory
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDocRef.current) return;
    if (renderedPagesRef.current.has(pageNum)) return;
    if (renderingInProgressRef.current.has(pageNum)) return;
    if (pageNum < 1 || pageNum > (pdfDocRef.current.numPages || 14)) return;

    renderingInProgressRef.current.add(pageNum);

    try {
      const page = await pdfDocRef.current.getPage(pageNum);
      // High resolution viewport for sharp newspaper text
      const viewport = page.getViewport({ scale: 1.8 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) {
        renderingInProgressRef.current.delete(pageNum);
        return;
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;

      const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
      renderedPagesRef.current.add(pageNum);
      renderingInProgressRef.current.delete(pageNum);
      setPageImages((prev) => ({ ...prev, [pageNum]: dataUrl }));
    } catch (err) {
      console.warn(`Failed to render page ${pageNum}:`, err);
      renderingInProgressRef.current.delete(pageNum);
    }
  }, []);

  // Pre-render visible and adjacent pages
  const prefetchAdjacentPages = useCallback(
    (page: number) => {
      const targets = [
        page,
        page + 1,
        page - 1,
        page + 2,
        page + 3,
        page - 2,
      ].filter((p) => p >= 1 && p <= totalPages);

      targets.forEach((p) => {
        if (!renderedPagesRef.current.has(p) && !renderingInProgressRef.current.has(p)) {
          renderPage(p);
        }
      });
    },
    [renderPage, totalPages]
  );

  // Load PDF document using dynamically loaded PDF.js
  useEffect(() => {
    let isCancelled = false;
    setIsPdfLoading(true);
    setPdfLoadError(null);
    setCurrentPage(1);
    setPageImages({});
    renderedPagesRef.current.clear();
    renderingInProgressRef.current.clear();
    setLoadingProgress(15);

    const initPdf = async () => {
      try {
        // Load PDF.js from CDN if not already on window
        let pdfjs = (window as any).pdfjsLib;
        if (!pdfjs) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load PDF engine"));
            document.head.appendChild(script);
          });
          pdfjs = (window as any).pdfjsLib;
        }

        if (isCancelled) return;

        pdfjs.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        setLoadingProgress(35);

        // Fetch and initialize PDF
        const loadingTask = pdfjs.getDocument({
          url: issue.pdfUrl,
          withCredentials: false,
          rangeChunkSize: 65536,
        });

        loadingTask.onProgress = (progressData: any) => {
          if (progressData.total > 0) {
            const pct = Math.min(90, Math.round((progressData.loaded / progressData.total) * 100));
            setLoadingProgress(pct);
          }
        };

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        setLoadingProgress(95);

        // Pre-render immediate pages: Cover (1), inside spread (2 and 3)
        await renderPage(1);
        if (doc.numPages > 1) await renderPage(2);
        if (doc.numPages > 2) await renderPage(3);

        setIsPdfLoading(false);
        setLoadingProgress(100);

        // Progressively pre-render remaining pages in background
        const queueRemainingPages = async () => {
          for (let p = 4; p <= doc.numPages; p++) {
            if (isCancelled) break;
            if (!renderedPagesRef.current.has(p)) {
              await renderPage(p);
              await new Promise((resolve) => setTimeout(resolve, 80));
            }
          }
        };
        queueRemainingPages();
      } catch (err: unknown) {
        console.error("PDF load error:", err);
        if (!isCancelled) {
          setIsPdfLoading(false);
          setPdfLoadError(
            err instanceof Error ? err.message : "Unable to load PDF document"
          );
        }
      }
    };

    initPdf();

    return () => {
      isCancelled = true;
    };
  }, [issue.pdfUrl, renderPage]);

  // Keep adjacent pages pre-fetched as current page changes
  useEffect(() => {
    if (pdfDocRef.current) {
      prefetchAdjacentPages(currentPage);
    }
  }, [currentPage, prefetchAdjacentPages]);

  // Seamless 3D Page Turn Actions
  const turnNext = useCallback(() => {
    if (isFlipping) return;

    if (isSpreadMode) {
      if (currentPage === 1) {
        // Transition from Cover (Page 1) to First Spread (Pages 2 & 3)
        const target = 2;
        if (target > totalPages) return;

        if (soundEnabled) playPaperSound();
        prefetchAdjacentPages(target);

        setFlipTransition({
          direction: "next",
          underneathLeft: null,
          underneathRight: totalPages >= 3 ? 3 : null,
          leafFront: 1,
          leafBack: 2,
          targetPage: target,
        });
        setIsFlipping(true);

        setTimeout(() => {
          setCurrentPage(target);
          setIsFlipping(false);
          setFlipTransition(null);
        }, 520);
      } else {
        // Turning spread forward: [currentPage | currentPage + 1] -> [target | target + 1]
        if (currentPage >= totalPages) return;
        const target = Math.min(totalPages, currentPage + 2);

        if (soundEnabled) playPaperSound();
        prefetchAdjacentPages(target);

        setFlipTransition({
          direction: "next",
          underneathLeft: currentPage,
          underneathRight: target + 1 <= totalPages ? target + 1 : null,
          leafFront: currentPage + 1 <= totalPages ? currentPage + 1 : null,
          leafBack: target,
          targetPage: target,
        });
        setIsFlipping(true);

        setTimeout(() => {
          setCurrentPage(target);
          setIsFlipping(false);
          setFlipTransition(null);
        }, 520);
      }
    } else {
      // Single / Mobile Mode
      if (currentPage >= totalPages) return;
      const target = currentPage + 1;

      if (soundEnabled) playPaperSound();
      prefetchAdjacentPages(target);

      setFlipTransition({
        direction: "next",
        underneathLeft: null,
        underneathRight: target,
        leafFront: currentPage,
        leafBack: target,
        targetPage: target,
      });
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentPage(target);
        setIsFlipping(false);
        setFlipTransition(null);
      }, 520);
    }
  }, [currentPage, isFlipping, isSpreadMode, soundEnabled, totalPages, prefetchAdjacentPages]);

  const turnPrev = useCallback(() => {
    if (isFlipping || currentPage <= 1) return;

    if (isSpreadMode) {
      if (currentPage <= 3) {
        // Returning to Cover (Page 1)
        const target = 1;

        if (soundEnabled) playPaperSound();
        prefetchAdjacentPages(target);

        setFlipTransition({
          direction: "prev",
          underneathLeft: null,
          underneathRight: totalPages >= 3 ? 3 : null,
          leafFront: 2,
          leafBack: 1,
          targetPage: target,
        });
        setIsFlipping(true);

        setTimeout(() => {
          setCurrentPage(target);
          setIsFlipping(false);
          setFlipTransition(null);
        }, 520);
      } else {
        // Turning spread backward: [currentPage | currentPage + 1] -> [target | target + 1]
        const target = Math.max(2, currentPage - 2);

        if (soundEnabled) playPaperSound();
        prefetchAdjacentPages(target);

        setFlipTransition({
          direction: "prev",
          underneathLeft: target,
          underneathRight: currentPage + 1 <= totalPages ? currentPage + 1 : null,
          leafFront: currentPage,
          leafBack: target + 1 <= totalPages ? target + 1 : null,
          targetPage: target,
        });
        setIsFlipping(true);

        setTimeout(() => {
          setCurrentPage(target);
          setIsFlipping(false);
          setFlipTransition(null);
        }, 520);
      }
    } else {
      // Single / Mobile Mode
      const target = Math.max(1, currentPage - 1);

      if (soundEnabled) playPaperSound();
      prefetchAdjacentPages(target);

      setFlipTransition({
        direction: "prev",
        underneathLeft: null,
        underneathRight: currentPage,
        leafFront: currentPage,
        leafBack: target,
        targetPage: target,
      });
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentPage(target);
        setIsFlipping(false);
        setFlipTransition(null);
      }, 520);
    }
  }, [currentPage, isFlipping, isSpreadMode, soundEnabled, totalPages, prefetchAdjacentPages]);

  const jumpToPage = (pageNum: number) => {
    if (isFlipping || pageNum === currentPage) return;
    if (soundEnabled) playPaperSound();

    if (isSpreadMode) {
      if (pageNum <= 1) {
        setCurrentPage(1);
      } else if (pageNum % 2 !== 0) {
        setCurrentPage(pageNum - 1);
      } else {
        setCurrentPage(pageNum);
      }
    } else {
      setCurrentPage(pageNum);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        turnNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        turnPrev();
      } else if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev, isFullscreen]);

  // Touch Swipe navigation
  const touchStartXRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        turnNext();
      } else {
        turnPrev();
      }
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Calculate visible pages in spread vs single mode
  const isCover = currentPage === 1;
  const leftPageNum = isSpreadMode ? (isCover ? null : currentPage) : currentPage;
  const rightPageNum = isSpreadMode
    ? isCover
      ? 1
      : currentPage + 1 <= totalPages
      ? currentPage + 1
      : null
    : null;

  // Pages underneath during flip vs static rest
  const effectiveLeftPage =
    isFlipping && flipTransition
      ? flipTransition.underneathLeft
      : isCover
      ? null
      : currentPage;

  const effectiveRightPage =
    isFlipping && flipTransition
      ? flipTransition.underneathRight
      : isCover
      ? 1
      : currentPage + 1 <= totalPages
      ? currentPage + 1
      : null;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col rounded-2xl border border-border/80 bg-neutral-950 text-neutral-100 shadow-2xl transition-all ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen rounded-none p-4" : "w-full overflow-hidden"
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-900/90 px-4 py-3 backdrop-blur-md">
        {/* Issue Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-neutral-100 sm:text-lg">
                {issue.title}
              </h2>
              <span className="rounded-full bg-accent-warm/20 px-2 py-0.5 text-xs font-medium text-accent-warm">
                {issue.date || "Edition"}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              {isSpreadMode && !isCover
                ? `Pages ${leftPageNum}${rightPageNum ? `–${rightPageNum}` : ""} of ${totalPages}`
                : `Page ${currentPage} of ${totalPages}`}
              {" · "}
              <span className="text-neutral-500">Click page corners, swipe, or use arrows</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Spread / Single Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSpreadMode(!isSpreadMode)}
            className="h-8 px-2.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white"
            title={isSpreadMode ? "Switch to Single Page" : "Switch to 2-Page Spread"}
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isSpreadMode ? "Spread" : "Single"}</span>
          </Button>

          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`h-8 w-8 p-0 text-neutral-300 hover:bg-neutral-800 hover:text-white ${
              soundEnabled ? "text-accent-warm" : "text-neutral-500"
            }`}
            title={soundEnabled ? "Mute page-turn sound" : "Enable page-turn sound"}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>

          {/* Zoom In / Zoom Out */}
          <div className="hidden items-center rounded-md border border-neutral-800 bg-neutral-900 sm:flex">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, Math.round((z - 0.15) * 100) / 100))}
              disabled={zoomLevel <= 0.8}
              className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-40"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[40px] text-center text-[11px] font-medium text-neutral-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, Math.round((z + 0.15) * 100) / 100))}
              disabled={zoomLevel >= 1.8}
              className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-40"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="border-l border-neutral-800 p-1.5 text-neutral-400 hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 w-8 p-0 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>

          {/* External links */}
          <a
            href={issue.drivePreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white"
            title="Open in Google Drive"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Main Flipbook Stage */}
      <div
        className="relative flex min-h-[520px] flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:min-h-[620px] sm:p-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Overlay */}
        {isPdfLoading && !pageImages[1] && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-sm">
            <div className="relative mb-4 h-16 w-16">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-neutral-900 text-primary">
                <BookOpen className="h-7 w-7 animate-pulse" />
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-200">
              Loading {issue.title}...
            </p>
            <div className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent-warm transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Rendering digital pages & interactive animations
            </p>
          </div>
        )}

        {/* Error Fallback */}
        {pdfLoadError && (
          <div className="z-40 max-w-md rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center">
            <FileText className="mx-auto mb-3 h-10 w-10 text-destructive" />
            <h3 className="text-base font-semibold text-destructive">
              Unable to stream interactive flipbook
            </h3>
            <p className="mt-1 text-xs text-neutral-300">
              You can still read the full issue directly in Google Drive or download it:
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <a
                href={issue.drivePreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open in Google Drive
              </a>
              <a
                href={`https://drive.usercontent.google.com/download?id=${issue.driveId}&export=download`}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
            </div>
          </div>
        )}

        {/* Navigation Arrow Left (Prev) */}
        <button
          onClick={turnPrev}
          disabled={currentPage <= 1 || isFlipping}
          className="group absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-neutral-300 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:border-accent-warm hover:bg-neutral-800 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:left-6"
          title="Previous Page (Left Arrow)"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Navigation Arrow Right (Next) */}
        <button
          onClick={turnNext}
          disabled={currentPage >= totalPages || isFlipping}
          className="group absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-neutral-300 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:border-accent-warm hover:bg-neutral-800 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:right-6"
          title="Next Page (Right Arrow)"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Flipbook Book Stage */}
        <div
          ref={bookContainerRef}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative max-w-full"
        >
          {/* Realistic Desk Shadow Underneath Book */}
          <div className="absolute -inset-4 -bottom-6 rounded-3xl bg-black/60 blur-2xl pointer-events-none" />

          {/* Book Wrapper with 3D Perspective */}
          <div
            className={`relative flex select-none items-center justify-center ${
              isSpreadMode
                ? "w-[340px] sm:w-[680px] md:w-[880px] lg:w-[980px]"
                : "w-[320px] sm:w-[440px] md:w-[500px]"
            }`}
            style={{
              perspective: "2600px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* === SPREAD MODE (2-PAGE SPREAD) === */}
            {isSpreadMode ? (
              <div
                className="relative flex w-full aspect-[2/1.414] overflow-hidden rounded-xl border border-neutral-800/80 bg-[#16171a] shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.65), 0 0 1px 1px rgba(255,255,255,0.05)",
                }}
              >
                {/* 1. LEFT PAGE (Underneath Base) */}
                <div
                  onClick={turnPrev}
                  className="group relative flex-1 cursor-pointer overflow-hidden border-r border-neutral-300/30 bg-[#fbfaf7]"
                  style={{
                    boxShadow: "inset -12px 0 18px -8px rgba(0,0,0,0.35)",
                  }}
                >
                  {effectiveLeftPage ? (
                    <PageImageRenderer
                      pageNum={effectiveLeftPage}
                      pageImages={pageImages}
                      fallbackThumbnail={
                        effectiveLeftPage === 1 ? issue.thumbnailUrl : undefined
                      }
                      title={`Page ${effectiveLeftPage}`}
                    />
                  ) : (
                    /* Archival Folio Back Casing when closed on Cover */
                    <ArchivalFolioBack
                      issue={issue}
                      totalPages={totalPages}
                      onOpen={turnNext}
                    />
                  )}

                  {/* Spine Shadow on Left Page Inner Edge */}
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-neutral-900/40 via-neutral-900/10 to-transparent" />

                  {/* Page Number Badge */}
                  {effectiveLeftPage && (
                    <div className="pointer-events-none absolute bottom-2 left-3 z-10 rounded bg-neutral-900/70 px-2 py-0.5 text-[10px] font-semibold text-white/95 backdrop-blur-sm">
                      {effectiveLeftPage}
                    </div>
                  )}

                  {/* Left Corner Fold Hint (Hover) */}
                  {effectiveLeftPage && effectiveLeftPage > 1 && (
                    <div className="pointer-events-none absolute bottom-0 left-0 h-14 w-14 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute bottom-0 left-0 h-10 w-10 origin-bottom-left -rotate-45 transform bg-gradient-to-bl from-neutral-200 via-white to-neutral-300 shadow-[3px_-3px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-125" />
                    </div>
                  )}
                </div>

                {/* 2. CENTER SPINE CREASE */}
                <div className="relative z-20 w-[3px] bg-neutral-400/80 shadow-[0_0_10px_rgba(0,0,0,0.7)]" />

                {/* 3. RIGHT PAGE (Underneath Base) */}
                <div
                  onClick={turnNext}
                  className="group relative flex-1 cursor-pointer overflow-hidden bg-[#fbfaf7]"
                  style={{
                    boxShadow: "inset 12px 0 18px -8px rgba(0,0,0,0.35)",
                  }}
                >
                  {effectiveRightPage ? (
                    <PageImageRenderer
                      pageNum={effectiveRightPage}
                      pageImages={pageImages}
                      fallbackThumbnail={
                        effectiveRightPage === 1 ? issue.thumbnailUrl : undefined
                      }
                      title={`Page ${effectiveRightPage}`}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#f5f4ef] p-6 text-center text-xs text-neutral-400">
                      <BookOpen className="mb-2 h-6 w-6 opacity-40 text-neutral-500" />
                      <span className="font-medium text-neutral-600">End of Issue</span>
                      <span className="text-[10px] text-neutral-400 mt-1">
                        The HIT Times Digital Archive
                      </span>
                    </div>
                  )}

                  {/* Spine Shadow on Right Page Inner Edge */}
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-neutral-900/40 via-neutral-900/10 to-transparent" />

                  {/* Page Number Badge */}
                  {effectiveRightPage && (
                    <div className="pointer-events-none absolute bottom-2 right-3 z-10 rounded bg-neutral-900/70 px-2 py-0.5 text-[10px] font-semibold text-white/95 backdrop-blur-sm">
                      {effectiveRightPage}
                    </div>
                  )}

                  {/* Right Corner Fold Hint (Hover) */}
                  {effectiveRightPage && effectiveRightPage < totalPages && (
                    <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 overflow-hidden">
                      <div className="absolute bottom-0 right-0 h-10 w-10 origin-bottom-right rotate-45 transform bg-gradient-to-br from-neutral-200 via-white to-neutral-300 shadow-[-3px_-3px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-125" />
                    </div>
                  )}

                  {/* Cover Call-to-Action badge if on Cover */}
                  {isCover && !isFlipping && (
                    <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md bg-neutral-900/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm shadow-lg transition-transform group-hover:scale-105">
                      Click to Open Issue →
                    </div>
                  )}
                </div>

                {/* 4. FLIPPING 3D LEAF - TURNING FORWARD (Right to Left) */}
                {isFlipping && flipTransition && flipTransition.direction === "next" && (
                  <div
                    className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-1/2 origin-left"
                    style={{
                      transformStyle: "preserve-3d",
                      animation: "flipTurnForward 520ms cubic-bezier(0.25, 1, 0.5, 1) forwards",
                    }}
                  >
                    {/* FRONT FACE of leaf (visible initially on the right, turns away) */}
                    <div
                      className="absolute inset-0 overflow-hidden bg-[#fbfaf7] shadow-[-10px_0_24px_rgba(0,0,0,0.4)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      {flipTransition.leafFront && (
                        <PageImageRenderer
                          pageNum={flipTransition.leafFront}
                          pageImages={pageImages}
                          fallbackThumbnail={
                            flipTransition.leafFront === 1 ? issue.thumbnailUrl : undefined
                          }
                          title={`Page ${flipTransition.leafFront}`}
                        />
                      )}
                      {/* Dynamic lighting gradient sweep */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.25) 25%, transparent 60%)",
                          animation: "shadowFadeOut 520ms ease-in forwards",
                        }}
                      />
                    </div>

                    {/* BACK FACE of leaf (visible as it crosses 90deg, lands on the left) */}
                    <div
                      className="absolute inset-0 overflow-hidden bg-[#fbfaf7] shadow-[10px_0_24px_rgba(0,0,0,0.4)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {flipTransition.leafBack && (
                        <PageImageRenderer
                          pageNum={flipTransition.leafBack}
                          pageImages={pageImages}
                          fallbackThumbnail={
                            flipTransition.leafBack === 1 ? issue.thumbnailUrl : undefined
                          }
                          title={`Page ${flipTransition.leafBack}`}
                        />
                      )}
                      {/* Landing spine shadow */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-900/40 via-neutral-900/10 to-transparent pointer-events-none" />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 40%)",
                          animation: "shadowFadeIn 520ms ease-out forwards",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* 5. FLIPPING 3D LEAF - TURNING BACKWARD (Left to Right) */}
                {isFlipping && flipTransition && flipTransition.direction === "prev" && (
                  <div
                    className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-1/2 origin-right"
                    style={{
                      transformStyle: "preserve-3d",
                      animation: "flipTurnBackward 520ms cubic-bezier(0.25, 1, 0.5, 1) forwards",
                    }}
                  >
                    {/* FRONT FACE of leaf (visible initially on the left, turns away) */}
                    <div
                      className="absolute inset-0 overflow-hidden bg-[#fbfaf7] shadow-[10px_0_24px_rgba(0,0,0,0.4)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      {flipTransition.leafFront && (
                        <PageImageRenderer
                          pageNum={flipTransition.leafFront}
                          pageImages={pageImages}
                          fallbackThumbnail={
                            flipTransition.leafFront === 1 ? issue.thumbnailUrl : undefined
                          }
                          title={`Page ${flipTransition.leafFront}`}
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.25) 25%, transparent 60%)",
                          animation: "shadowFadeOut 520ms ease-in forwards",
                        }}
                      />
                    </div>

                    {/* BACK FACE of leaf (visible as it crosses 90deg, lands on the right) */}
                    <div
                      className="absolute inset-0 overflow-hidden bg-[#fbfaf7] shadow-[-10px_0_24px_rgba(0,0,0,0.4)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {flipTransition.leafBack && (
                        <PageImageRenderer
                          pageNum={flipTransition.leafBack}
                          pageImages={pageImages}
                          fallbackThumbnail={
                            flipTransition.leafBack === 1 ? issue.thumbnailUrl : undefined
                          }
                          title={`Page ${flipTransition.leafBack}`}
                        />
                      )}
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-900/40 via-neutral-900/10 to-transparent pointer-events-none" />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 40%)",
                          animation: "shadowFadeIn 520ms ease-out forwards",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* === SINGLE PAGE / MOBILE MODE === */
              <div
                onClick={turnNext}
                className="group relative aspect-[1/1.414] w-full cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-[#fbfaf7] shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.65)",
                }}
              >
                {/* Underneath Base Layer */}
                <PageImageRenderer
                  pageNum={
                    isFlipping && flipTransition?.targetPage
                      ? flipTransition.targetPage
                      : currentPage
                  }
                  pageImages={pageImages}
                  fallbackThumbnail={currentPage === 1 ? issue.thumbnailUrl : undefined}
                  title={`Page ${currentPage}`}
                />

                {/* Page Number Pill */}
                <div className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-full bg-neutral-900/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {currentPage} / {totalPages}
                </div>

                {/* Mobile Flip Animation Leaf */}
                {isFlipping && flipTransition && (
                  <div
                    className="pointer-events-none absolute inset-0 z-30 bg-[#fbfaf7] shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "left center",
                      animation:
                        flipTransition.direction === "next"
                          ? "mobileFlipForward 520ms cubic-bezier(0.25, 1, 0.5, 1) forwards"
                          : "mobileFlipBackward 520ms cubic-bezier(0.25, 1, 0.5, 1) forwards",
                    }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <PageImageRenderer
                        pageNum={flipTransition.leafFront || currentPage}
                        pageImages={pageImages}
                        fallbackThumbnail={
                          (flipTransition.leafFront || currentPage) === 1
                            ? issue.thumbnailUrl
                            : undefined
                        }
                        title="Turning page"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/25" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Scrubber Bar */}
      <div className="flex flex-col gap-2 border-t border-neutral-800 bg-neutral-900/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          {/* Quick Prev Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={turnPrev}
            disabled={currentPage <= 1 || isFlipping}
            className="h-8 border-neutral-700 bg-neutral-800/80 text-xs text-neutral-200 hover:bg-neutral-700 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="mr-1 h-3.5 w-3.5" />
            Prev
          </Button>

          {/* Page Scrubber Slider */}
          <div className="flex flex-1 items-center gap-3 max-w-md">
            <span className="text-xs font-semibold text-neutral-400">1</span>
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => jumpToPage(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-neutral-700 accent-primary"
            />
            <span className="text-xs font-semibold text-neutral-400">{totalPages}</span>
          </div>

          {/* Quick Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={turnNext}
            disabled={currentPage >= totalPages || isFlipping}
            className="h-8 border-neutral-700 bg-neutral-800/80 text-xs text-neutral-200 hover:bg-neutral-700 hover:text-white disabled:opacity-40"
          >
            Next
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>

          {/* Thumbnails Filmstrip Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`h-8 px-2.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white ${
              showThumbnails ? "bg-neutral-800 text-accent-warm" : ""
            }`}
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden sm:inline">Thumbnails</span>
          </Button>
        </div>

        {/* Collapsible Page Thumbnails Filmstrip */}
        {showThumbnails && (
          <div className="mt-2 flex gap-2 overflow-x-auto border-t border-neutral-800/60 pt-3 pb-1 scrollbar-thin">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
              const isSelected =
                pNum === currentPage ||
                (isSpreadMode && !isCover && pNum === currentPage + 1);

              return (
                <button
                  key={pNum}
                  onClick={() => jumpToPage(pNum)}
                  className={`group relative flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/40 scale-105"
                      : "border-neutral-700 opacity-70 hover:opacity-100 hover:border-neutral-500"
                  }`}
                  style={{ width: "60px", height: "85px" }}
                >
                  {pageImages[pNum] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pageImages[pNum]}
                      alt={`Page ${pNum}`}
                      className="h-full w-full object-cover"
                    />
                  ) : pNum === 1 && issue.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={issue.thumbnailUrl}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-[10px] font-semibold text-neutral-400">
                      p. {pNum}
                    </div>
                  )}
                  <span className="absolute bottom-0 inset-x-0 bg-neutral-900/80 text-center text-[9px] font-bold text-white py-0.5">
                    {pNum}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Embedded 3D Keyframes & Transitions */}
      <style>{`
        @keyframes flipTurnForward {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes flipTurnBackward {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }

        @keyframes shadowFadeOut {
          0% {
            opacity: 0;
          }
          35% {
            opacity: 0.45;
          }
          100% {
            opacity: 0.85;
          }
        }

        @keyframes shadowFadeIn {
          0% {
            opacity: 0.85;
          }
          65% {
            opacity: 0.35;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes mobileFlipForward {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes mobileFlipBackward {
          0% {
            transform: rotateY(-180deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
};

// Subcomponent: Archival Folio Back when closed on Cover (Spread Mode)
const ArchivalFolioBack: React.FC<{
  issue: TabloidIssue;
  totalPages: number;
  onOpen: () => void;
}> = ({ issue, totalPages, onOpen }) => (
  <div
    onClick={onOpen}
    className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#1c1d22] via-[#141518] to-[#0d0e10] p-6 text-neutral-200 select-none cursor-pointer"
  >
    {/* Archival linen texture */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

    {/* Header */}
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
        <Sparkles className="h-3.5 w-3.5 text-accent-warm" />
        <span>The HIT Times</span>
      </div>
      <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-400">
        Vol. {issue.issueNumber}
      </span>
    </div>

    {/* Center Seal / Embossment */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-4">
      <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-accent-warm/40 bg-accent-warm/10 shadow-[0_0_25px_rgba(217,119,6,0.2)]">
        <BookOpen className="h-7 w-7 text-accent-warm" />
      </div>
      <h3 className="editorial-heading text-lg font-medium text-neutral-100 sm:text-xl">
        {issue.title}
      </h3>
      <p className="mt-1 text-xs text-neutral-400 max-w-[200px]">
        {issue.subtitle} {issue.date ? `· ${issue.date}` : ""}
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/30 transition-colors">
        <span>Open Issue</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </div>

    {/* Footer info */}
    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-neutral-500">
      <span>Official Campus Tabloid</span>
      <span>{totalPages} Pages Edition</span>
    </div>
  </div>
);

// Subcomponent to render either loaded page image, fallback thumbnail, or elegant loading skeleton
const PageImageRenderer: React.FC<{
  pageNum: number;
  pageImages: Record<number, string>;
  fallbackThumbnail?: string;
  title: string;
}> = ({ pageNum, pageImages, fallbackThumbnail, title }) => {
  const imgSrc = pageImages[pageNum] || fallbackThumbnail;

  if (imgSrc) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-contain pointer-events-none select-none"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#f7f6f0] p-6 text-neutral-400">
      <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      <span className="text-xs font-medium text-neutral-500">
        Rendering Page {pageNum}...
      </span>
      <span className="mt-1 text-[10px] text-neutral-400">
        High-fidelity vector print
      </span>
    </div>
  );
};

export default DigitalFlipbook;
