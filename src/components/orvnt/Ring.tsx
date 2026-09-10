import ringAsset from "@/assets/orvnt-ring.png.asset.json";

/**
 * The authoritative ORVNT ring mark, lifted from the brand source file.
 * It is a dark-on-transparent PNG, so it inverts under the dark theme.
 */
export function Ring({
  size = 40,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={ringAsset.url}
      alt="ORVNT"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`block shrink-0 [[data-theme=dark]_&]:invert ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}

/** Ring locked to always render light (for permanently black stages). */
export function RingOnVoid({
  size = 40,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={ringAsset.url}
      alt="ORVNT"
      width={size}
      height={size}
      decoding="async"
      className={`block shrink-0 invert ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}
