"use client";

import cwCalendar from "@/components/calendarComponents/cwCalendar";
import DevCalendar from "@/components/calendarComponents/devCalendar";
import gdCalendar from "@/components/calendarComponents/gdCalendar";
import photographyCalendar from "@/components/calendarComponents/photographyCalendar";
import videoEditingCalendar from "@/components/calendarComponents/videoEditingCalendar";
import digitalArtCalendar from "@/components/calendarComponents/digitalArtCalendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const allInvLinks = [
  {
    title: "Content Writing",
    url: "https://chat.whatsapp.com/Hwca6qAxXbWHhecNmW6BDL",
    calendar: cwCalendar,
  },
  {
    title: "Digital Art",
    url: "https://chat.whatsapp.com/FSyigKoBe25FwJ1kHcxfpi",
    calendar: digitalArtCalendar,
  },
  {
    title: "Graphics Designing",
    url: "https://chat.whatsapp.com/Dah992r1SYg8v1aH1GY4uI",
    calendar: gdCalendar,
  },
  {
    title: "Video Editing",
    url: "https://chat.whatsapp.com/FYr3t5JKc1AK8GmXGaqKlV",
    calendar: videoEditingCalendar,
  },
  {
    title: "Video Editing",
    url: "https://chat.whatsapp.com/FYr3t5JKc1AK8GmXGaqKlV",
    calendar: videoEditingCalendar,
  },
  {
    title: "Web Development",
    url: "https://chat.whatsapp.com/FPJabNIcPtR3DtMASCoArr",
    calendar: DevCalendar,
  },
  {
    title: "Photography",
    url: "https://chat.whatsapp.com/Eu4XLmConwW2hcaKF1xsyt",
    calendar: photographyCalendar,
  },
];

function TSPsuccessPage({ params }: { params: { interestsId: string } }) {
  const invLinks = params.interestsId.split("").map(
    (char) => allInvLinks[Number(char)]
  ).filter(Boolean);

  return (
    <div className="animate-in-subtle mx-auto max-w-3xl space-y-10 pb-12">
      <div className="flex justify-center">
        <Image
          src="/tsp-26/tsp_logo.png"
          alt="Trainee Scholars Program"
          width={200}
          height={200}
          className="h-32 w-auto object-contain sm:h-40"
        />
      </div>

      <header className="space-y-4 text-center">
        <p className="tag-editorial">Submitted</p>
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
          Your response has been recorded
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thank you for submitting your TSP form. Join the domain-specific WhatsApp
          groups below and keep your contact number active for updates.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          WhatsApp groups
        </h2>
        <div className="grid gap-4">
          {invLinks.map((inv) => (
            <Link
              key={inv.title}
              href={inv.url}
              target="_blank"
              rel="noopener noreferrer"
              className="micro-lift flex items-center gap-4 border border-border bg-card px-5 py-4 transition-colors hover:border-foreground/30"
            >
              <Image
                src="/socials/whatsapp.png"
                width={32}
                height={32}
                alt=""
              />
              <span className="font-medium">{inv.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Mark your calendars
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {invLinks.map((inv) => (
            <Card key={`cal-${inv.title}`} className="border-border">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">{inv.title}</p>
                </div>
                <inv.calendar />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <Button variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

export default TSPsuccessPage;
