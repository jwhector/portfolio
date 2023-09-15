function handleScroll() {
    if (window.innerWidth <= 1280) return;
  const sections = document.getElementsByTagName("section");
  const main = document.getElementsByTagName("main").item(0);
  let timeout = false;

  const getSectionInViewport = () => {
    const sectionDistances = [];
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      sectionDistances.push(rect.top);
    }
    const normalizedDistances = sectionDistances.map((distance) =>
      Math.abs(distance)
    );
    let minIdx = 0;
    while (
      minIdx < normalizedDistances.length &&
      normalizedDistances[minIdx] > normalizedDistances[minIdx + 1]
    ) {
      minIdx++;
    }
    main.dataset.section = minIdx;
  };

  getSectionInViewport();

  let sectionIdx = Number(main.dataset.section);
  const scrollDown = () => {
    if (sectionIdx < sections.length - 1) {
      sectionIdx++;
      sections.item(sectionIdx).scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollUp = () => {
    if (sectionIdx > 0) {
      sectionIdx--;
      sections.item(sectionIdx).scrollIntoView({ behavior: "smooth" });
    }
  };

  main.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "ArrowUp") scrollUp();
    if (e.key === "ArrowDown") scrollDown();
  });

  main.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (timeout) return;
    timeout = true;
    if (e.deltaY > 0) {
      scrollDown();
    } else {
      scrollUp();
    }
    main.dataset.section = sectionIdx;
    setTimeout(() => {
      timeout = false;
    }, 300);
  });
}

handleScroll();
