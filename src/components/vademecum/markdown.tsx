import { cn } from "@/lib/utils";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";

/** Drops the Markdown AST node that react-markdown passes to components. */
function domProps<T extends { node?: unknown }>(props: T): Omit<T, "node"> {
  const { node, ...rest } = props;
  void node;
  return rest;
}

const components: Components = {
  p: (props) => <p {...domProps(props)} />,
  h3: (props) => (
    <h3
      className="text-foreground pt-2 text-base font-semibold"
      {...domProps(props)}
    />
  ),
  ul: (props) => (
    <ul
      className="marker:text-muted-foreground list-disc space-y-1.5 pl-5"
      {...domProps(props)}
    />
  ),
  ol: (props) => (
    <ol
      className="marker:text-muted-foreground list-decimal space-y-1.5 pl-5 marker:font-medium"
      {...domProps(props)}
    />
  ),
  li: (props) => (
    <li className="pl-1 [&>ol]:mt-1.5 [&>ul]:mt-1.5" {...domProps(props)} />
  ),
  strong: (props) => (
    <strong className="text-foreground font-semibold" {...domProps(props)} />
  ),
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-[#1abc9c] hover:underline">
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1abc9c] hover:underline"
      >
        {children}
      </a>
    ),
};

/** Renders Vademecum Markdown with the app's typography. */
export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[72ch] space-y-3 leading-relaxed", className)}>
      <ReactMarkdown
        components={components}
        allowedElements={[
          "p",
          "h3",
          "ul",
          "ol",
          "li",
          "strong",
          "em",
          "a",
          "br",
        ]}
        unwrapDisallowed
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Markdown inside a single line, e.g. a guidepost or a list title. */
export function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{ ...components, p: ({ children }) => <>{children}</> }}
      allowedElements={["p", "strong", "em", "a", "br"]}
      unwrapDisallowed
    >
      {children}
    </ReactMarkdown>
  );
}
