
/* v96 roulette hard guard
   古いルーレット処理が同じボタンを後から拾って、
   カジノモード中にカスタム項目で回る問題を止める。 */
(function(){
  const rouletteStopIds = new Set([
    "spinRoulette",
    "addRouletteItem",
    "shuffleRoulette",
    "clearRouletteHistory",
    "clearRouletteBets",
    "addRouletteGuestBetter",
    "rouletteCustomMode",
    "rouletteCasinoMode",
    "backRouletteToGames",
    "openRouletteFromGames"
  ]);

  document.addEventListener("click", function(e){
    const t = e.target;
    if(!t) return;
    const target = t.closest ? t.closest("button,[data-bet],[data-del-bet],[data-del-roulette],[data-del-roulette-guest]") : t;
    if(!target) return;

    const isRouletteControl =
      rouletteStopIds.has(target.id) ||
      (target.dataset && (
        target.dataset.bet !== undefined ||
        target.dataset.delBet !== undefined ||
        target.dataset.delRoulette !== undefined ||
        target.dataset.delRouletteGuest !== undefined
      ));

    if(isRouletteControl){
      e.stopImmediatePropagation();
    }
  }, true);
})();
