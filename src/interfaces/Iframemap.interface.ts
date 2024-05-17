

export default interface Iframemap {

    src: string;
    height: string;
    width: string;
}


/**
Aufbau des Strings
http://www.google.com/maps/place/<lat>,<lng>/@<lat>,<lng>,<zoom>z
https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS


so sieht ein iframe aus:
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.0062880300834!2d10.705129999999999!3d50.626999999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a390991fb52cc3%3A0x1579ecc9b33c4cce!2sD%C3%B6rrenbachstra%C3%9Fe%2022%2C%2098528%20Suhl!5e0!3m2!1sde!2sde!4v1714064357415!5m2!1sde!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

_____
eingefügtes iframe
<iframe title="iframe" attributes="[object Object]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde"></iframe>

*/
