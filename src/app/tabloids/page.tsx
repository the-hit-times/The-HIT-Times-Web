import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const issues = [
  { title: "Tabloid Issue 12", src: "https://drive.google.com/file/d/1mIX6cQCOYcIBWHZVglwg1UMDMmT6LUaB/preview" },
  { title: "Tabloid Issue 11", src: "https://drive.google.com/file/d/1veba6c-gUBntMdCxoOeiTsQ42G1lEHWD/preview" },
  { title: "Tabloid Issue 10", src: "https://drive.google.com/file/d/1aGkUuleaTzujKY6XwoL8HLLfVJCCZNaN/preview" },
  { title: "Tabloid Issue 9", src: "https://drive.google.com/file/d/19R0ctZ-LhKZ1IeKrukeoh3UW41v-C6wK/preview" },
  { title: "Tabloid Issue 7", src: "https://drive.google.com/file/d/10qmuUj5wjXc9hNwl2Ufti8ciPN61DRIt/preview" },
  { title: "Tabloid Issue 6", src: "https://drive.google.com/file/d/1-bYArvJOkEIDpdXsiBNy0ytExBORAUIM/preview" },
  { title: "Tabloid Issue 5", src: "https://drive.google.com/file/d/1mmXAH5GmZJ60P51dOtugnjmQMdJr5DyC/preview" },
  { title: "Tabloid Issue 4", src: "https://drive.google.com/file/d/1Vb8aXIpXgdVlFrBL_q6u9_JvVlHvLQeq/preview" },
  { title: "Tabloid Issue 3", src: "https://drive.google.com/file/d/1mYZm3aN7f4wc3a4kI4g0Ku8sTEsFewog/preview" },
  { title: "Tabloid Issue 2", src: "https://drive.google.com/file/d/1aUrkYqHeodrx9MrnjpaKqQSf1o9f_JxV/preview" },
  { title: "Tabloid Issue 1", src: "https://drive.google.com/file/d/1bh226035gJwsREEfF0BddWCdfajhsd-F/preview" },
];

const TabloidsPage = () => {
  return (
    <div className="animate-in-subtle space-y-10">
      <header>
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
          Our Tabloids
        </h1>
        <p className="mt-2 text-muted-foreground">
          Digital archive of print editions.
        </p>
        <Separator className="mt-4 w-16 bg-primary" />
      </header>

      <div className="space-y-8">
        {issues.map((issue) => (
          <Card key={issue.title} className="overflow-hidden border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{issue.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src={issue.src}
                width="100%"
                height="600"
                allow="autoplay"
                className="border-0"
                title={issue.title}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TabloidsPage;
