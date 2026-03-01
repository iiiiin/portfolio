import Image from "next/image";

type RawProps = Record<string, unknown>;

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().replace(/px$/i, "").replace(/[{}]/g, "");
    const direct = Number(normalized);
    if (Number.isFinite(direct)) {
      return direct;
    }
    const matched = normalized.match(/-?\d+(\.\d+)?/);
    if (matched) {
      const extracted = Number(matched[0]);
      return Number.isFinite(extracted) ? extracted : Number.NaN;
    }
    return Number.NaN;
  }
  return Number.NaN;
}

function pickFirstNumber(props: RawProps, keys: string[]): number {
  for (const key of keys) {
    const parsed = toNumber(props[key]);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return Number.NaN;
}

function pickString(props: RawProps, key: string, fallback = ""): string {
  const value = props[key];
  return typeof value === "string" ? value : fallback;
}

export default function BlogImage(rawProps: RawProps) {
  const src = pickString(rawProps, "src");
  const alt = pickString(rawProps, "alt");
  const className = pickString(rawProps, "className");
  const priority = rawProps.priority === true || rawProps.priority === "true";

  const resolvedWidth = pickFirstNumber(rawProps, ["width"]);
  const resolvedHeight = pickFirstNumber(rawProps, ["height"]);
  const resolvedMaxWidth = pickFirstNumber(rawProps, ["maxWidth", "maxwidth", "max-width"]);

  const hasValidDimensions =
    Number.isFinite(resolvedWidth) &&
    Number.isFinite(resolvedHeight) &&
    resolvedWidth > 0 &&
    resolvedHeight > 0;

  const fallbackMaxWidth = 920;
  const preferredMaxWidth = Number.isFinite(resolvedMaxWidth)
    ? resolvedMaxWidth
    : hasValidDimensions
      ? resolvedWidth
      : fallbackMaxWidth;
  const sizes = `(max-width: 768px) 100vw, ${preferredMaxWidth}px`;
  const imageClassName = ["h-auto w-full rounded-lg", className].filter(Boolean).join(" ");

  if (!src) {
    return null;
  }

  if (!hasValidDimensions) {
    return (
      <figure
        className="my-6 flex justify-center"
        data-width={String(rawProps.width ?? "")}
        data-height={String(rawProps.height ?? "")}
        data-max-width={String(rawProps.maxWidth ?? rawProps.maxwidth ?? rawProps["max-width"] ?? preferredMaxWidth)}
      >
        <div style={{ width: "min(100%, " + preferredMaxWidth + "px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={imageClassName}
          />
        </div>
      </figure>
    );
  }

  return (
    <figure
      className="my-6 flex justify-center"
      data-width={String(rawProps.width ?? "")}
      data-height={String(rawProps.height ?? "")}
      data-max-width={String(rawProps.maxWidth ?? rawProps.maxwidth ?? rawProps["max-width"] ?? preferredMaxWidth)}
    >
      <div style={{ width: "min(100%, " + preferredMaxWidth + "px)" }}>
        <Image
          src={src}
          alt={alt}
          width={resolvedWidth}
          height={resolvedHeight}
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </div>
    </figure>
  );
}
