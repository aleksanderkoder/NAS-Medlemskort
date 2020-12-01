// Vanilla javascript
  // Her var det tomt, gitt!

// JQuery start
$(document).ready(function(){ 

    // Adresse til NAS API
    const api = "HIDDEN";

    $("#loaderSendeMail").hide();
    $("#sideSendeMail").hide();
    $("#formEndrePass2").hide();
    $("#sideNyBruker").hide();
    $("#sideBevis").hide();
    $("#loader").hide();
    $("#sideEndrePersInfo").hide();
    $("#sideEndrePass").hide();
    $("#loaderOpprettPass").hide();
    $("#loaderEndrePass").hide();
    $("#pLoggInnTips").hide();


// Events til OS

    // Gir støtte for Android/iOS tilbakeknapp
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
       e.preventDefault();

       if($("#sideNyBruker").css("display") == "block")
       {
         resetForms();
         $("#sideNyBruker").hide();
         $("#sideLoggInn").show();
       }
       else if($("#sideEndrePersInfo").css("display") == "block")
       {
        resetForms();
         $("#sideEndrePersInfo").hide();
         $("#sideBevis").show();
       }
       else if($("#sideEndrePass").css("display") == "block")
       {
        resetForms();
         $("#sideEndrePass").hide();
         $("#sideBevis").show();
       }
       else if($("#sideSendeMail").css("display") == "block")
       {
        resetForms();
         $("#sideSendeMail").hide();
         $("#sideLoggInn").show();
       }
    }

    // Gir støtte for nettverksinformasjon for Android/iOS
    document.addEventListener("offline", onOffline, false);
    var netPro = false;
    function onOffline() {
      netPro = true;
      Noti.fire({
        type: "info",
        title: "Du har ingen internettforbindelse!"
      })
    }
    document.addEventListener("online", onOnline, false);
    function onOnline() {
      if(netPro == true)
      {
        netPro = false;
        Noti.fire({
          type: "success",
          title: "Du har internettforbindelse!"
        })
      }

    }
    
// Regex-funksjoner
    function regExLoggInn(){
      regEx1=/^[0-9]{5,5}$/;
      regEx2=/^[a-zæøåA-ZÆØÅ0-9!?,.-]{6,99}$/;

      OK1=regEx1.test($.trim($("#medlemsnr").val()));
      OK2=regEx2.test($("#passord").val());

            if(!OK1 || !OK2)
      {
        Swal.fire({
          title: "Vennligst skriv inn et gyldig medlemsnummer og passord!",
          confirmButtonColor: "#8b0000",
          type: "info"}
        )
        $("#loader").hide();
                return false;
            }
            else
      {
              return true;
            }
        }

    function regExEndrePersInfo() {
      regExMail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      regExTLF=/^[0-9+]{5,15}$/;
      regExAdresse=/^[a-zæøåA-ZÆØÅ0-9 ]{2,60}$/;
      regExPostnr=/^[-a-zA-Z0-9 ]{4,12}$/;
      regExPoststed=/^[a-zæøåA-ZÆØÅ]{2,50}$/;
      var feilTeller = 0; 

      if($("#txtEndreEpost").val() != "")
      {
        OK1=regExMail.test($("#txtEndreEpost").val().trim());
        if(!OK1)
        {
          feilTeller++;
          $("#txtEndreEpost").addClass("animated shake");
          $("#tip1").html("Ugyldig e-postadresse!");
        }
      }
      if($("#txtEndreTelefon").val() != "")
      {
        OK2=regExTLF.test($("#txtEndreTelefon").val().trim());
        if(!OK2)
        {
          feilTeller++;
          $("#txtEndreTelefon").addClass("animated shake");
          $("#tip2").html("Ugyldig telefonnummer!"); 
        }
      }
      if($("#txtEndreAdresse").val() != "")
      {
        OK3=regExAdresse.test($("#txtEndreAdresse").val().trim());
        if(!OK3)
        {
          feilTeller++;
          $("#txtEndreAdresse").addClass("animated shake");
          $("#tip3").html("Ugyldig adresse!"); 
        }
      }
      if($("#txtEndrePostnr").val() != "")
      {
        OK4=regExPostnr.test($("#txtEndrePostnr").val().trim());

        if(!OK4)
        {
          feilTeller++;
          $("#txtEndrePostnr").addClass("animated shake");
          $("#tip4").html("Ugyldig postnummer!"); 
        }
      }
      if($("#txtEndrePoststed").val() != "")
      {
        OK5=regExPoststed.test($("#txtEndrePoststed").val().trim());
        if(!OK5)
        {
          feilTeller++; 
          $("#txtEndrePoststed").addClass("animated shake");
          $("#tip5").html("Ugyldig poststed!");
        }
      }
      
      if(feilTeller > 0)
      {
        return false;
      }
      else
      {
        return true; 
      }    
    }

    function regExNyBruker(){
      regEx=/^[a-zæøåA-ZÆØÅ0-9!?,.-]{6,99}$/;
      OK=regEx.test($("#passNyttPass").val().trim());
      if(!OK)
      {
        swal.fire({
          title: "Passordet må være minst 6 tegn langt og kun bestå av bokstaver og tall!",
          type: "warning",
          confirmButtonColor: "#8b0000"
        })
        return false;
      }
      else
      {
        return true;
      }
    }

    function regExNyttPass(){
      regEx=/^[a-zæøåA-ZÆØÅ0-9!?,.-]{6,99}$/;
      OK=regEx.test($("#txtEndrePass").val().trim());
      if(!OK)
      {
        swal.fire({
          title: "Passordet må være minst 6 tegn langt og kun bestå av bokstaver og tall!",
          type: "warning",
          confirmButtonColor: "#8b0000"
        })
        return false;
      }
      else
      {
        return true;
      }
      
    }

    function regExSendeMail(){
      regEx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      OK=regEx.test($.trim($("#txtSendeEpost").val())); 
      if(!OK)
      {
        swal.fire({
          title: "Vennligst oppgi en gyldig e-postadresse!",
          type: "warning",
          confirmButtonColor: "#8b0000"
        })
        return false;
      }
      else
      {
        return true;
      }
    }

// Varsel om manglende e-postadresse
function varselManglerEpost()
{
  var mn = window.localStorage.getItem("brukernavn");
  $.ajax(
    {
      type:"POST",
      url: api + "hentMedlemKontaktinfo.php",
      dataType: "json",
      data:{medlemsNr:mn},
      cache:false,
      success:function(data) {
          if(data[0] == "" || data[0] == null && localStorage.length == 3)
          {
            setTimeout(function(){
              Top.fire({
                type: "question",
                title: "Du har ikke registrert en e-postadresse. Ønsker du å registrere nå?",
                showConfirmButton: true,
                confirmButtonText: "Registrer nå"
              }).then((result) => {
                              if (result.value) {
                                    if($("#sideBevis").css("display") == "block")
                                    {
                                      $("#sideBevis").hide();
                                      $("#sideEndrePersInfo").show();
                                    }
                                    else if($("#sideEndrePass").css("display") == "block")
                                    {
                                      $("#sideEndrePass").hide();
                                      $("#sideEndrePersInfo").show();
                                    }
                            }}); 
            }, 1500);          
          }
      }
  });
}


// Engangsinnlogging
if(window.localStorage.getItem("engangs") == "nei")
{
  localStorage.clear(); 
}

if(window.localStorage.getItem("engangs") == "ja")
{
  $("#checkLoggInn").attr("checked", true); 
}

    $("#checkLoggInn").click(function ()
    {
      if($("#checkLoggInn").prop("checked") == true)
      {
        window.localStorage.setItem("engangs","ja");
      }
      else
      {
        window.localStorage.setItem("engangs","nei");
      }
      
    });

    if(window.localStorage.length == 3 && window.localStorage.getItem("engangs") == "ja")
    {
      var engangsBrukernavn = window.localStorage.getItem("brukernavn");
      var engangsPassord = window.localStorage.getItem("passord");
      $("#medlemsnr").val(engangsBrukernavn);
      $("#passord").val(engangsPassord);
      loggInn();
    }


// Funksjon for innlogging
    function loggInn(){
      $("#loader").show();
      $("#btnLoggInn").hide();
      if($("#checkLoggInn").prop("checked") == true)
      {
        window.localStorage.setItem("engangs","ja");
      }
      else{
        window.localStorage.setItem("engangs","nei");
      }
      if(regExLoggInn())
      {
        var medlemsnr = $("#medlemsnr").val().trim();
        var passord = $("#passord").val().trim();

        if($.trim(medlemsnr).length > 0 & $.trim(passord).length > 0)
        {
            $.ajax(
              {
                type:"POST",
                url: api + "loggInnSjekk.php",
                dataType: "json",
                data:{Medlemsnummer:medlemsnr, Passord:passord},
                cache:false,
                error: function(er){
                  Swal.fire({
                    title: "En feil har oppstått",
                    text: "Klarte ikke å koble til tjener!",
                    confirmButtonColor: "#8b0000",
                    type: "error"}
                  );
                  $("#loader").hide();
                  $("#btnLoggInn").show();
                },
                success:function(data) {
                    varselManglerEpost();
                    $("#loader").hide();
                    $("#btnLoggInn").show();
                    if(data[0] == "ok")
                    {
                      var knr = document.getElementById("medlemsnr").value;
                      var pass = document.getElementById("passord").value;
                      window.localStorage.setItem("brukernavn", knr);
                      window.localStorage.setItem("passord", pass);

                      $("#persNavn").html(data[2]);
                      $("#persMedlemsnummer").html("#" + data[1]);

                      if(data[3] == "Udefinert")
                      {
                        $("#persMedlemstype").html("Udefinert medlemstype");
                      }
                      else if(data[3] == "Livsvarig")
                      {
                        $("#persMedlemstype").html("Livsvarig medlem");
                      }
                      else
                      {
                        $("#persMedlemstype").html(data[3]);
                      }

                      if(data[5] == "")
                      {
                        $("#persUtlops").html("");
                      }
                      else
                      {
                        var middUt = data[5];
                        var midUtRes = middUt.split("-");
                        $("#persUtlops").html("Utløpsdato: " + midUtRes[2]+"."+midUtRes[1]+"."+midUtRes[0]);
                      }

                      if(data[11] == "Aktiv")
                      {
                        $("#ugyldig").hide();
                        $("#persStatus").html("Gyldig");
                        $("#persStatus").css("color", "green");
                      }
                      else
                      {
                        $("#gyldig").hide();
                        $("#persStatus").html("Ugyldig");
                        $("#persStatus").css("color", "red");
                      }

                      if(data[4] == "Ja")
                      {

                        $("#persBetalt").html("Betalt kontingent");
                        $("#persBetalt").css("color", "green");
                      }
                      else
                      {

                        $("#persBetalt").html("Ubetalt kontingent");
                        $("#persBetalt").css("color", "red");
                      }

                      $("#sideLoggInn").hide();
                      $("#sideBevis").show();
                    }
                    else {
                      Swal.fire({
                        title: data,
                        confirmButtonColor: "#8b0000",
                        type: "error"}
                      )
                      $("#pLoggInnTips").slideDown();
                    }
                }
          });
        }
      }
        else
        {
          $("#btnLoggInn").show();
        }
      }

// Funksjoner for knapper
    $("#btnLoggInn").click(function ()
    {
      loggInn(); 
    });

    $("#checkLoggInn").click(function ()
    {
      if($("#checkLoggInn").prop("checked") == true)
      {
        setTimeout(function(){
          Noti.fire({
            type: "info",
            title: "Du vil nå bli automatisk innlogget!"
      });
        }, 300);
      }
       
    });

    $("#btnEndrePersInfo").click(function ()
    {
      $("#sideBevis").hide();
      $("#sideEndrePersInfo").show();
      var mn = window.localStorage.getItem("brukernavn");
      $.ajax(
        {
          type:"POST",
          url: api + "hentMedlemKontaktinfo.php",
          dataType: "json",
          data:{medlemsNr:mn},
          cache:false,
          error: function(er){
            Swal.fire({
              title: "En feil har oppstått",
              text: "Klarte ikke å koble til tjener!",
              confirmButtonColor: "#8b0000",
              type: "error"}
            );
            return false; 
          },
          success:function(data) {
              
              $("#txtEndreEpost").val(data[0]);
              $("#txtEndreTelefon").val(data[1]);
              $("#txtEndreAdresse").val(data[2]);
              $("#txtEndrePostnr").val(data[3]);
              $("#txtEndrePoststed").val(data[4]);
              M.updateTextFields();
              return true; 
          }
      });
    });

    $("#btnLagreEndringerPersInfo").click(function ()
    {
      if(regExEndrePersInfo())
      {
        var epost = $("#txtEndreEpost").val().trim();
        var tlf = $("#txtEndreTelefon").val().trim();
        var adresse = $("#txtEndreAdresse").val().trim();
        var postnr = $("#txtEndrePostnr").val().trim();
        var poststed = $("#txtEndrePoststed").val().trim();
        var mn = window.localStorage.getItem("brukernavn");

        $.ajax(
          {
            type:"POST",
            url: api + "endreMedlemKontaktinfo.php",
            dataType: "json",
            data:{medlemsNr : mn, medlemsEpost : epost,
              medlemsTelefon : tlf, medlemsAdresse : adresse,
                medlemsPostnr : postnr, medlemsPoststed : poststed},
            cache:false,
            error: function(er){
              Swal.fire({
                title: "En feil har oppstått",
                text: "Klarte ikke å koble til tjener!",
                confirmButtonColor: "#8b0000",
                type: "error"}
              );
            },
            success:function(data) {
              if(data == "ok" || data == "feil")
              {
                  Swal.fire({
                    title: "Din informasjon er blitt endret!",
                    confirmButtonColor: "#8b0000",
                    type: "success"}
                  );
                  $("#tip1").html("");
                  $("#tip2").html("");
                  $("#tip3").html("");
                  $("#tip4").html("");
                  $("#tip5").html("");
                  $("#txtEndreEpost").removeClass("animated shake");
                  $("#txtEndreTelefon").removeClass("animated shake");
                  $("#txtEndreAdresse").removeClass("animated shake");
                  $("#txtEndrePostnr").removeClass("animated shake");
                  $("#txtEndrePoststed").removeClass("animated shake");
              }
              else
              {
                Swal.fire({
                  title: "Vennligst fyll ut feltene på riktig måte!",
                  confirmButtonColor: "#8b0000",
                  type: "error"}
                );
              }
              
            }
        });
      }
    });

    $("#checkRegPass").change(function ()
    {
      if($("#passNyttPass").attr('type') == "password")
      {
        $("#passNyttPass").attr('type', 'text');
      }
      else {
        $("#passNyttPass").attr('type', 'password');
      } 
    });

    $("#checkNyttPass").change(function ()
    {
      if($("#txtEndrePassGammelt").attr('type') == "password")
      {
        $("#txtEndrePassGammelt").attr('type', 'text');
      }
      else {
        $("#txtEndrePassGammelt").attr('type', 'password');
      }
       
    });

    $("#checkNyttPass2").change(function ()
    {
      if($("#txtEndrePass").attr('type') == "password")
      {
        $("#txtEndrePass").attr('type', 'text');
      }
      else {
        $("#txtEndrePass").attr('type', 'password');
      }
    });

    $("#btnEndrePass").click(function ()
    {
      $("#sideBevis").hide();
      $("#sideEndrePass").show();
    });

    $("#btnTilbakeSidePersInfo").click(function ()
    {
      $("#sideEndrePersInfo").hide();
      $("#sideBevis").show();
      resetForms();
      $("#tip1").html("");
      $("#tip2").html("");
      $("#tip3").html("");
      $("#tip4").html("");
      $("#tip5").html("");
      $("#txtEndreEpost").removeClass("animated shake");
      $("#txtEndreTelefon").removeClass("animated shake");
      $("#txtEndreAdresse").removeClass("animated shake");
      $("#txtEndrePostnr").removeClass("animated shake");
      $("#txtEndrePoststed").removeClass("animated shake");
    });

    $("#btnTilbakeSidePass").click(function ()
    {
      $("#sideEndrePass").hide();
      $("#sideBevis").show();
      $("#btnLagreEndringerPass").show();
      resetForms();
    });

    $("#linkNyttPass").click(function ()
    {
      $("#sideLoggInn").hide();
      $("#sideNyBruker").show();
    });

    $("#linkEndrePersInfo").click(function ()
    {
      Swal.fire({
        title: "Personlig informasjon",
        text: "Det er valgfritt å registrere personlig informasjon i applikasjonen. Disse opplysningene vil kun være synlige for et fåtall systemansvarlige i Norsk Arkeologisk Selskap, og vil kun brukes dersom det er nødvendig å kommunisere viktig informasjon til medlemmene. Du har mulighet til å fjerne denne informasjonen når som helst.",
        confirmButtonColor: "#8b0000",
        type: "info"}
      );
    });

    $("#btnTilbakeSide2").click(function ()
    {
      $("#sideNyBruker").hide();
      $("#sideLoggInn").show();
      resetForms();
    });

    $("#btnNyttPass").click(function ()
    {
      $("#loaderOpprettPass").show();
      $("#btnNyttPass").hide();
      var medlems = $("#medlemsnrNyttPass").val();
      var nyttPass = $("#passNyttPass").val();
      if($.trim(medlems).length > 0 & $.trim(nyttPass).length > 0)
      {
        if(regExNyBruker())
        {
          $.ajax(
            {
              type:"POST",
              url: api + "registrerPassord.php",
              dataType: "json",
              data:{Medlemsnummer:medlems, Passord:nyttPass},
              error: function(er){
                Swal.fire({
                  title: "En feil har oppstått",
                  text: "Klarte ikke å koble til tjener!",
                  confirmButtonColor: "#8b0000",
                  type: "error"}
                );
                $("#loaderOpprettPass").hide();
                $("#btnNyttPass").show();
              },
              cache:false,
              success:function(data) {
                if(data == "Passordet har blitt registrert!")
                {
                  Swal.fire({
                    title: data,
                    confirmButtonColor: "#8b0000",
                    type: "success"}
                  );
                  $("#loaderOpprettPass").hide();
                  $("#btnNyttPass").show();
                }
                else {
                  
                    Swal.fire({
                      title: data,
                      confirmButtonColor: "#8b0000",
                      type: "error"}
                    );
                    $("#loaderOpprettPass").hide();
                    $("#btnNyttPass").show();
                  }
                }
                
          });
        }
        else
        {
          $("#loaderOpprettPass").hide();
          $("#btnNyttPass").show();
        }
      }
      else
      {
          Swal.fire({
            title: "Vennligst skriv inn ditt medlemsnummer og ditt nye passord!",
            confirmButtonColor: "#8b0000",
            type: "info"}
          );
          $("#loaderOpprettPass").hide();
          $("#btnNyttPass").show();
      }
    });

    $("#linkBevis").click(function (){
      $("#sideLoggInn").hide();
      $("#sideBevis").show();
    });

    $("#gyldig").click(function (){
      $("#gyldig").addClass("animated wobble");

      setTimeout(function (){
        $("#gyldig").removeClass("animated wobble");
          $("#gyldig").addClass("animated infinite pulse");
      }, 900)
    });

    $("#ugyldig").click(function (){
      $("#ugyldig").addClass("animated wobble");

      setTimeout(function (){
        $("#ugyldig").removeClass("animated wobble");
          $("#ugyldig").addClass("animated infinite pulse");
      }, 900)
    });

    $("#btnLagreEndringerPass").click(function (){
      if($("#txtEndrePassGammelt").val() == window.localStorage.getItem("passord"))
      {
        $("#formEndrePass2").slideDown();
        $("#btnLagreEndringerPass").hide();
        $("#loaderEndrePass").hide();
        $("#txtEndrePassGammelt").attr("disabled","true");
      }
      else {
        Swal.fire({
          title: "Passordet stemmer ikke med ditt gamle passord!",
          confirmButtonColor: "#8b0000",
          type: "error"}
        ); 
      }

    });

    $("#btnLagreEndringerPass2").click(function (){
      $("#loaderEndrePass").show();
      $("#btnLagreEndringerPass2").hide();
      var nyttPassord = $("#txtEndrePass").val().trim();
      var nummer = window.localStorage.getItem("brukernavn");
      if(regExNyttPass())
      {
        $.ajax(
        {
          type:"POST",
          url: api + "endreMedlemPassord.php",
          dataType: "json",
          data:{medlemsNr: nummer, medlemsPassord: nyttPassord},
          error: function(er){
            Swal.fire({
              title: "En feil har oppstått",
              text: "Klarte ikke å koble til tjener!",
              confirmButtonColor: "#8b0000",
              type: "error"}
            );
            $("#loaderEndrePass").hide();
            $("#btnLagreEndringerPass2").show();
          },
          cache:false,
          success:function(data) {
            if(data == "ok")
            {
              Swal.fire({
                title: "Ditt nye passord er registrert!",
                confirmButtonColor: "#8b0000",
                type: "success"}
              )
              $("#loaderEndrePass").hide();
              $("#btnLagreEndringerPass2").show();
              window.localStorage.setItem("passord",nyttPassord);
            }
            else
            {
                Swal.fire({
                  title: data,
                  confirmButtonColor: "#8b0000",
                  type: "error"}
                )
              $("#loaderEndrePass").hide();
              $("#btnLagreEndringerPass2").show();
            }
            }
    });
      }
      else
      {
        $("#loaderEndrePass").hide();
        $("#btnLagreEndringerPass2").show();
      }
        
    });

    // Funksjon for å sette skjemaer til starttilstand
    function resetForms()
    {
      $("#loggForm").trigger("reset");
      $("#formRegPass").trigger("reset");
      $("#formEndrePass1").trigger("reset");
      $("#formEndrePass2").hide();
      $("#formEndrePass2").trigger("reset");
      $("#formEndrePersInfo").trigger("reset");
      $("#txtEndrePassGammelt").removeAttr("disabled");
      $("#pLoggInnTips").hide();
      $("#formSendeMail").trigger("reset");
    }

    $("#linkSideMail").click(function (){
      $("#sideLoggInn").hide();
      $("#sideSendeMail").show();
    });

    $("#btnTilbakeSideMail").click(function (){
      $("#sideSendeMail").hide();
      $("#sideLoggInn").show();
      resetForms();
    });
    
    $("#btnSendeMail").click(function (){
      if(regExSendeMail())
      {
        $("#loaderSendeMail").show();
        $("#btnSendeMail").hide();
        var getEpost = $("#txtSendeEpost").val(); 
        getEpost = getEpost.trim(); 
        $.ajax(
          {
            type:"POST",
            url: api + "appSendeMail.php",
            dataType: "json",
            data:{epost:getEpost},
            error: function(er){
              Swal.fire({
                title: "En feil har oppstått",
                text: "Klarte ikke å koble til tjener!",
                confirmButtonColor: "#8b0000",
                type: "error"}
              );
              $("#loaderSendeMail").hide();
              $("#btnSendeMail").show();
            },
            cache:false,
            success:function(data) {
              if(data == "ok")
              {
                Swal.fire({
                  title: "E-post med nytt passord har blitt sendt!",
                  confirmButtonColor: "#8b0000",
                  type: "success"}
                );
                $("#loaderSendeMail").hide();
                $("#btnSendeMail").show();
              }
              else if(data == "epost finnes ikke"){
                  Swal.fire({
                    title: "Ingen medlem er registrert med denne e-postadressen!",
                    confirmButtonColor: "#8b0000",
                    type: "info"}
                  );
                  $("#loaderSendeMail").hide();
                  $("#btnSendeMail").show();
                }
                else
                {
                  Swal.fire({
                    title: "Vennligst skriv inn en gyldig e-postadresse!",
                    confirmButtonColor: "#8b0000",
                    type: "info"}
                  );
                }
              }
        });
      }
    });

    $("#btnLoggUt").click(function (){
      window.localStorage.clear();
      resetForms();

      setTimeout(function(){
        $("#gyldig").show();
        $("#ugyldig").show();
      }, 600);

      $("#sideBevis").hide();
      $("#sideLoggInn").show();

      setTimeout(function(){
        Noti.fire({
          type: "success",
          title: "Du er logget ut!"
        }); 
      }, 900);
    });
  });

  const Noti = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 7000,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }})
  const Top = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 10000,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }})
  
