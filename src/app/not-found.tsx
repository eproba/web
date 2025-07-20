"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const [initParticles, setInitParticles] = useState(false);
  const particlesColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  return (
    <>
      {initParticles && (
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                grab: {
                  distance: 200,
                  links: {
                    opacity: 0.4,
                  },
                },
              },
            },
            particles: {
              color: {
                value: particlesColor || "#000000",
              },
              links: {
                color: particlesColor || "#000000",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 100,
                limit: {
                  mode: "delete",
                  value: 200,
                },
              },
              opacity: {
                value: 0.2,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
          className="-z-1"
        />
      )}
      <div className="pointer-events-none fixed inset-0 mx-10 flex touch-none flex-col items-center justify-center text-center">
        <Card className="bg-muted/20 pointer-events-auto backdrop-blur-xs select-none">
          <CardContent>
            <h1 className="mb-4 text-8xl font-bold">404</h1>
            <p className="mb-2 text-2xl">Nie znaleziono strony</p>
            <p className="mb-6 text-lg">
              Przepraszamy, ale strona, której szukasz, nie istnieje.
            </p>
            <Link href="/">
              <Button>Wróć do strony głównej</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
