import { useEffect, useRef } from "react";

/**
 * Locks scrolling on detected scrollable ancestors when `locked` is true.
 * - Detects html, body, #root, main, [data-scroll-container], and any visible scrollable elements.
 * - Stores previous inline styles and scroll position, restores on unlock.
 * - Compensates for scrollbar width to avoid layout jump.
 */
export default function useScrollLock(locked) {
  const lockedElsRef = useRef([]);

  useEffect(() => {
    const isScrollable = (el) => {
      if (!el) return false;
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const canScroll = el.scrollHeight > el.clientHeight + 1; // tolerance
      return canScroll && (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay");
    };

    // Build candidate list (common app containers first)
    const candidates = [];
    candidates.push(document.documentElement); // html
    candidates.push(document.body);
    const root = document.getElementById("root");
    if (root) candidates.push(root);
    const mains = document.querySelectorAll("main, [data-scroll-container]");
    mains.forEach((m) => candidates.push(m));

    // also find any other scrollable elements
    const all = Array.from(document.querySelectorAll("*"));
    all.forEach((el) => {
      if (isScrollable(el) && !candidates.includes(el)) candidates.push(el);
    });

    // unique & present
    const elsToLock = candidates.filter((el, idx) => el && candidates.indexOf(el) === idx);

    if (locked) {
      const prev = [];
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      elsToLock.forEach((el) => {
        try {
          const style = el.style;
          const computed = window.getComputedStyle(el);

          prev.push({
            el,
            overflowY: style.overflowY || "",
            position: style.position || "",
            top: style.top || "",
            left: style.left || "",
            right: style.right || "",
            width: style.width || "",
            paddingRight: style.paddingRight || "",
            scrollTop: el.scrollTop || 0,
          });

          // For documentElement / body we preserve page position using fixed position technique
          if (el === document.body || el === document.documentElement) {
            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
            style.position = "fixed";
            style.top = `-${scrollY}px`;
            style.left = "0";
            style.right = "0";
            style.overflowY = "hidden";
            style.width = "100%";
            // compensate padding for scrollbar
            if (scrollbarWidth > 0) {
              style.paddingRight = `calc(${style.paddingRight || "0px"} + ${scrollbarWidth}px)`;
            }
          } else {
            // other scroll containers: hide scroll
            style.overflowY = "hidden";
            // do not change position to avoid layout side effects
          }
        } catch (err) {
          // ignore elements we can't modify
        }
      });

      lockedElsRef.current = prev;
    } else {
      // restore previous styles
      lockedElsRef.current.forEach((item) => {
        const { el, overflowY, position, top, left, right, width, paddingRight, scrollTop } = item;
        try {
          const style = el.style;
          style.overflowY = overflowY || "";
          style.position = position || "";
          style.top = top || "";
          style.left = left || "";
          style.right = right || "";
          style.width = width || "";
          style.paddingRight = paddingRight || "";
          if (el === document.body || el === document.documentElement) {
            const storedTop = (top || "").toString();
            const y = storedTop ? Math.abs(parseInt(storedTop.replace("px", "")) || 0) : 0;
            window.scrollTo(0, y || scrollTop || 0);
          } else {
            el.scrollTop = scrollTop || 0;
          }
        } catch (err) {}
      });

      lockedElsRef.current = [];
    }

    // cleanup on unmount
    return () => {
      lockedElsRef.current.forEach((item) => {
        const { el, overflowY, position, top, left, right, width, paddingRight, scrollTop } = item;
        try {
          const style = el.style;
          style.overflowY = overflowY || "";
          style.position = position || "";
          style.top = top || "";
          style.left = left || "";
          style.right = right || "";
          style.width = width || "";
          style.paddingRight = paddingRight || "";
          if (el === document.body || el === document.documentElement) {
            const storedTop = (top || "").toString();
            const y = storedTop ? Math.abs(parseInt(storedTop.replace("px", "")) || 0) : 0;
            window.scrollTo(0, y || scrollTop || 0);
          } else {
            el.scrollTop = scrollTop || 0;
          }
        } catch (err) {}
      });
      lockedElsRef.current = [];
    };
  }, [locked]);
}
