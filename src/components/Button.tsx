import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "dark" | "text";

interface ButtonBaseProps {
  /** primary: pink pill. secondary: outlined pill. dark: for use on colour blocks. text: underlined link. */
  variant?: ButtonVariant;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

type LinkProps = ButtonBaseProps & { href: string };
type NativeProps = ButtonBaseProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps
  >;

export type ButtonProps = LinkProps | NativeProps;

const base =
  "group inline-flex items-center gap-3 font-semibold transition-colors duration-[var(--duration-hover)] disabled:cursor-not-allowed disabled:opacity-60";

const pill = "rounded-pill px-7 py-3.5 text-body leading-none";

const variants: Record<ButtonVariant, string> = {
  primary: `${pill} bg-pink text-night hover:bg-cream`,
  secondary: `${pill} border-2 border-current hover:bg-cream hover:text-night hover:border-cream`,
  dark: `${pill} bg-night text-cream hover:bg-cream hover:text-night`,
  text: "underline decoration-2 underline-offset-[6px] decoration-current hover:decoration-pink",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    arrow = false,
    className = "",
    children,
  } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          weight="bold"
          aria-hidden
          className="size-[1.1em] transition-transform duration-[var(--duration-hover)] group-hover:translate-x-1 motion-reduce:transition-none"
        />
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    arrow: _a,
    className: _c,
    children: _ch,
    type = "button",
    ...rest
  } = props;
  void _v;
  void _a;
  void _c;
  void _ch;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
