import { useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";
import Gutter from "./gutter";

const breadcrumb = () => {
  const { pathname } = useLocation();

  const routes = pathname.split("/").filter(Boolean);

  if (routes.length === 0 || routes.length === 1) return null;

  return (
    <Gutter>
      <Breadcrumb>
        <BreadcrumbList>
          {routes.map((route, index) => {
            const routePath = routes.slice(0, index + 1).join("/");
            const isLast = index === routes.length - 1;
            const isInBetween = routes.length > 2 && index > 1 && !isLast;
            const isFirst = index === 0;

            if (isInBetween) return null;

            if (isLast)
              return (
                <BreadcrumbItem key={index} className="capitalize">
                  <BreadcrumbPage>{route}</BreadcrumbPage>
                </BreadcrumbItem>
              );

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className="capitalize">
                  <BreadcrumbLink href={`/${routePath}`}>
                    {route}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {isFirst && routes.length > 3 && (
                  <>
                    <BreadcrumbEllipsis />
                    <BreadcrumbSeparator />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </Gutter>
  );
};

export default breadcrumb;
