// Элементы формы
const squareInput = document.querySelector('#square-input');
const inputs = document.querySelectorAll('input');

//селектор
const select = document.getElementsByName('myselect')

// Радиокнопки
const radioType = document.querySelectorAll('input[name="type"]');

// Чекбокс
const ceilings = document.querySelector('input[name="ceiling"]');

const basePrice = 0;
const totalPriceElement = document.querySelector('#total-price');

let selectnow=1;
let radios = document.getElementById('radios');
let checkbox = document.getElementById('checkbox');

function calculate() {
	let totalPrice
    const reg = /[^0-9]|\b0[0-9]+/;
    if(reg.test(parseInt(squareInput.value)) === true){
        alert("Повторите ввод данных");
        totalPriceElement.innerText = "0";
    }
    else{
        if(selectnow==1){ //огэ
            totalPrice=500;
            totalPrice *= parseInt(squareInput.value);
        }
        else if(selectnow==2){ //усп
            totalPrice=800;
            for (const radio of radioType) {
                if (radio.checked) {
                    totalPrice = totalPrice * parseFloat(radio.value);
                }
            }
            totalPrice *= parseInt(squareInput.value);
        }
        else if(selectnow==3){ //егэ
            totalPrice=1000;
            if (ceilings.checked) {
                totalPrice = totalPrice + parseInt(ceilings.value);
            }
            totalPrice *= parseInt(squareInput.value);
        }
        const formatter = new Intl.NumberFormat('ru');
        totalPriceElement.innerText = formatter.format(totalPrice);
    }
}

//калькулятор из задачи 5
function onClick() {
    const reg = /[^0-9]|\b0[0-9]+/;
    let price = document.getElementsByName("field1");
    let amount = document.getElementsByName("field2");
    if((reg.test(price[0].value) || reg.test(amount[0].value)) === true){
        alert("Ошибка! Некорректный ввод!");
    }
    else { 
      let result = document.getElementById("result");
      result.innerHTML = parseInt(price[0].value)*parseInt(amount[0].value);
      return false;
    }
  }
//

window.addEventListener('DOMContentLoaded', function (event) {
    calculate();
    radios.style.display = "none";
    checkbox.style.display = "none";
    select[0].addEventListener("change", function(event) {
      let select = event.target;
      if (select.value == "1") {
        radios.style.display = "none";
        checkbox.style.display = "none";
        selectnow = 1;           
      }
      else if(select.value == "2") {
        radios.style.display = "block";
        checkbox.style.display = "none";
        selectnow = 2;
      }
      else {
        radios.style.display = "none";
        checkbox.style.display = "block";
        selectnow = 3;
      }
      calculate();
    });
    
    for (const input of inputs) {
        input.addEventListener('input', function () {
            calculate();
        });
    }

    //калькулятор из задачи 5
    let button = document.getElementById("count");
    button.addEventListener("click", onClick);
    //
  });

  //задание 7, слайдер
  $(document).ready(function(){
    $('.slider').slick({
      arrows:true,
      dots:true,
      adaptiveHeight:true,
      slidesToShow:4,
      slidesToScroll:4,
      speed: 1000,
      responsive:[
        {
          breakpoint: 768,
          settings:{
            slidesToShow:2,
            slidesToScroll:2
          }
        }
      ]
    });
  });


//задание 8

// PopUp Form and thank you popup after sending message
var $popOverlay = $(".popup-overlay");
var $popWindow = $(".popWindow");
var $popupMainWindow = $(".popup-main-window");
var $popThankYouWindow = $(".thank-you-window");
var $popClose = $(".close-btn");
var $popOpen = $("#for-popup-form");

$(function() {
    // Close Pop-Up after clicking on the button "Close"
    $popClose.on("click", function() {
        history.replaceState(null, null, ' ');
        $popOverlay.fadeOut();
        $popWindow.fadeOut();
        $popThankYouWindow.fadeOut();
    });

    // Close Pop-Up after clicking on the Overlay
    $(document).on("click", function(event) {
        if ($(event.target).closest($popWindow).length) return;
        history.replaceState(null, null, ' ');
        $popOverlay.fadeOut();
        $popWindow.fadeOut();
        $popThankYouWindow.fadeOut();
        event.stopPropagation();
    });

    //сохраним в localstorage данные формы
    // localStorage.setItem("name", $('[name = "popup-name"]'));
    // localStorage.setItem("email", $('[name = "popup-email"]'));
    // localStorage.setItem("textarea", $('[name = "popup-message"]'));

    // popup form
    $(".popup-form").submit(function() {
        var th = $(this);
        $(".popup-submit").prop('disabled', true);
        $.ajax({
        type: "POST",
        url: "https://formcarry.com/s/knFjN-Abmv-",
        data: th.serialize(),
        })
        //.done(function() {
        // после успешной отправки скрываем форму подписки и выводим окно с благодарностью за заполнение формы
        $popupMainWindow.fadeOut();
        $popThankYouWindow.fadeIn();
        // очищаем форму
        setTimeout(function() {
            $(".popup-submit").prop('disabled', false);
            th.trigger("reset");
        }, 1000);
        //});
        return false;
    });
});

$(document).ready(function() {
    $popOpen.click(function(){
        window.location.hash = "#popup";
        $popOverlay.fadeIn();
        $popupMainWindow.fadeIn();
        return false;
    });
});

$(window).on('hashchange', function (event) { //при клике на "назад" скрывать форму
    if(window.location.hash == "#popup"){
        $popOverlay.fadeIn();
        $popupMainWindow.fadeIn();
    }
    else{
        if(window.location.hash != "#popup") {
            $popOverlay.fadeOut();
            $popupMainWindow.fadeOut();
            $popThankYouWindow.fadeOut();
        }
    }
});