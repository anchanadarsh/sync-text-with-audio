$(document).ready(function () {
  function wrapEachLetter(item) {
    var count = "";
    var getEachParaL = item.text().split("");
    item.text("");
    for (var i = 0; i < getEachParaL.length; i++) {
      if (getEachParaL[i] == " ") {
        item.append(" ");
      } else {
        item.append("<span>" + getEachParaL[i] + "</span>");
        count++;
      }
    }

    return count;
  }

  $(".stwa_wrap").each(function () {
    var getAudio = $(this).find(".stwa_audio audio");
    var characterCount = 0;

    var getAutioTextArea = $(this).find(".stwa_text");
    getAutioTextArea.find(".stwa_text_item").each(function () {
      var eachCount = wrapEachLetter($(this));
      characterCount = characterCount + eachCount;
    });

    setInterval(audioPercentage(getAudio[0]), 500);
    console.log(characterCount);
    console.log(getAudio[0].duration);
  });

  //check audio percentage and update time accordingly
  function audioPercentage(audio) {
    console.log((audio.currentTime / audio.duration) * 100);
  }
});
