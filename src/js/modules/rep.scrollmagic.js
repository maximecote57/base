;'use strict';

window.REP = window.REP || {};

// We create the scrollmagic controller so that it can be used everywhere to add animations
// This way, we have only one listener on the window scroll event
$(function () {

    window.REP.scrollMagicController = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter"}});

});