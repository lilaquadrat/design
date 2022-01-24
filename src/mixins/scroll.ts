export default (): void => {

  let hash: string[];

  if (document.location.href.indexOf('#') > -1) {

    hash = document.location.href.split('#');
    const element = document.getElementById(hash[1]);

    if (!element) return;

    const offSet = element.offsetTop;

    setTimeout(() => {

      window.scroll(0, offSet);

    }, 500);

  }

};
