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
    var characterCount = 0;

    var getAutioTextArea = $(this).find(".stwa_text");
    getAutioTextArea.find(".stwa_text_item").each(function () {
      var eachCount = wrapEachLetter($(this));
      characterCount = characterCount + eachCount;
    });

    $(this).attr("data-total-characters", characterCount);
  });

  //check audio percentage and update time accordingly
  function getAudioPercentage(audio) {
    return (audio.currentTime / audio.duration) * 100;
  }

  var audioUpdateInterval;

  //play audio
  $(".play_audio").on("click", function () {
    var getParent = $(this).parents(".stwa_wrap")
    var getAudio = getParent.find(".stwa_audio audio");
    getAudio[0].play();

    audioUpdateInterval = setInterval(function () {
      highlightText(getAudioPercentage(getAudio[0]) , getParent);
    }, (parseInt(getParent.attr('data-total-characters')) / getAudio[0].duration));

  });

  //pause audio
  $(".pause_audio").on("click", function () {

    var getAudio = $(this).parents(".stwa_wrap").find(".stwa_audio audio");
    getAudio[0].pause();
    clearInterval(audioUpdateInterval);

  });

  var startLoop = 0;
  //hightlight Text
  function highlightText(audioPercent,hightlightFor) {
    // console.log(hightlightFor);
    var textsToHighlight = Math.floor(0.01 * audioPercent * parseInt(hightlightFor.attr('data-total-characters')));
    for(var i = startLoop; i<textsToHighlight ; i++){
      hightlightFor.find('.stwa_text span').eq(i).addClass('active');
    }
  }
});
