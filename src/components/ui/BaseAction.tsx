import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps, type To } from 'react-router-dom';

type ActionAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: undefined;
  href?: undefined;
};

type ActionAsRouterLink = Omit<RouterLinkProps, 'to'> & {
  to: To;
  href?: undefined;
};

type ActionAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  to?: undefined;
  /** Force new-tab behaviour; inferred from absolute URLs by default */
  external?: boolean;
};

/** Renders a router link (`to`), an anchor (`href`) or a native button. */
export type ActionProps = ActionAsButton | ActionAsRouterLink | ActionAsAnchor;

const ABSOLUTE_URL = /^(https?:)?\/\//i;

function isRouterLink(props: ActionProps): props is ActionAsRouterLink {
  return props.to !== undefined;
}

function isAnchor(props: ActionProps): props is ActionAsAnchor {
  return props.href !== undefined;
}

/* Internal primitive shared by Button, IconButton and Link. */
export function BaseAction(props: ActionProps) {
  if (isRouterLink(props)) {
    const { to, ...rest } = props;
    return <RouterLink to={to} {...rest} />;
  }

  if (isAnchor(props)) {
    const { href, external, ...rest } = props;
    const opensNewTab = external ?? ABSOLUTE_URL.test(href);
    return (
      <a
        href={href}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      />
    );
  }

  const { type = 'button', ...rest } = props;
  return <button type={type} {...rest} />;
}
