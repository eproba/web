export function Footer() {
  return (
    <footer className="text-muted-foreground mt-auto border-t py-2 text-center text-sm sm:text-base">
      <strong className="text-foreground">Epróba</strong> by{" "}
      <a
        href="https://github.com/Antoni-Czaplicki"
        target="_blank"
        className="text-[#1abc9c]"
      >
        Antoni Czaplicki
      </a>
      . Source code is available on{" "}
      <a
        href="https://github.com/eproba"
        target="_blank"
        className="text-[#1abc9c]"
      >
        GitHub
      </a>
      .
    </footer>
  );
}
