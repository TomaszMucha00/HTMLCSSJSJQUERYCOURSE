/*

Index.js

*/

$(document).ready(function () {

    "use strict"

    var resultsList = $("#resultsList");
    resultsList.text("To jest z jQuery");

    var toglleButton = $("#toglleButton");
    toglleButton.on("click", function () {
        resultsList.toggle(500);

        if (toglleButton.text() == "Ukryj") {
            toglleButton.text("Pokaż");
        }
        else {
            toglleButton.text("Ukryj");
        }
    });

    var listaElementow = $("header nav li");
    listaElementow.css("font-weight", "bold");
    listaElementow.css("font-size", "22px");
    listaElementow.filter(":first").css("font-size", "20px");

    $("header nav li:first").css("font-size", "30px");

    function wyswietlanieWynikow(wynik) {
        resultsList.empty();
        $.each(wynik, function (i, element) {
            var newResult = $("<div class='result'>" +
                "<div class='title'>" + element.name + "</div>" +
                "<div class='title'>" + element.description + "</div>" +
                "<div class='title'>" + element.full_name + "</div>" +
                "<div>" + element.language + "</div>" +
                "<div>" + element.owner.login + "</div>" +
                "</div>");

            newResult.hover(function () {
                $(this).css("background-color", "lightgray");
            }, function () {
                $(this).css("background-color", "transparent");
            });

            resultsList.append(newResult);

        })
    }

    $("#gitHubWynikiForm").on("submit", function () {

        var szukanaFraza = $("#frazaWyszukiwania").val();
        var maGwiazdki = $("#maGwiazdki").val();
        var wybierzJezyk = $("#wybierzJezyk").val();

        if (szukanaFraza) {
            resultsList.text("Wykonywanie wyszukiwania");

            var GitHubWyniki = "https://api.github.com/search/repositories?q=" + encodeURI(szukanaFraza);

            if (wybierzJezyk != "Wszystkie") {
                GitHubWyniki += "language:" + encodeURI(wybierzJezyk);
            }

            if (maGwiazdki) {
                GitHubWyniki += "&sort=stars";
            }

            console.log(GitHubWyniki);

            $.get(GitHubWyniki, function (wynik) {
                wyswietlanieWynikow(wynik.items);
            });
        }
        return false;
    })

});




