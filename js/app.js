'use strict';
/* global $ Handlebars */

const imagesArray = [];
const keywordArray = [];
const keywordArray2 = [];
const imagesArray2 = [];
let currentPage = '1';
function ImageRender(image_url, keyword, title, description, page, horns) {
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  this.description = description;
  this.page = page;
  this.horns = horns;
  if (!keywordArray.includes(this.keyword) && this.page === '1') {
    keywordArray.push(this.keyword)
}else if(!keywordArray2.includes(this.keyword) && this.page === '2'){
    keywordArray2.push(this.keyword)
}
}

ImageRender.prototype.renderImageToPage = function () {
const templateClone = Handlebars.compile($('#template').html());
const result = templateClone(this);
$('#photo-template').append(result);
$('.2').hide();
};

function renderKeywordFilter(array, select, firstOption, class1, showOrHide) {
  // console.log(keywordArray);
  const $optionClone = $(firstOption).clone();
  $optionClone.text('display all');
  $optionClone.attr('value', 'display-all');
  $(select).append($optionClone);
  array.forEach((a, index) => {
    // console.log( typeof class1, typeof a);
    const $optionClone2 = $(firstOption).clone();
    $optionClone2.text(array[index]);
    $optionClone2.attr('value', array[index]);
    $optionClone2.attr('class', `${class1} ${a}`);
    $(select).append($optionClone2);
  })
}

ImageRender.prototype.filter = function (select) {
  $(select).on('change', function () {
    if ($(select).children('option:selected').val() !== 'default') {
      $('li').hide(); // hides all images
      console.log($(`li[data-name="${$(select).children('option:selected').attr('class')}"]`))
        $(`li[data-name="${$(select).children('option:selected').attr('class')}"]`).show();
      


    }
    if ($(this).children("option:selected").val() === 'display-all') {
      if(currentPage === '1'){
        currentPage = '2';
        $('.2').show();
      } else {
        currentPage = '1';
        $('.1').show();
      }
    }
  })
}


$.get('data/page-1.json', function (Data) {
  Data.forEach(thing => {
    const newImage = new ImageRender(thing.image_url, thing.keyword, thing.title, thing.description, '1', thing.horns);
    //   console.log(newImage);
    newImage.renderImageToPage();
    newImage.filter('#firstSelect');
    imagesArray.push(newImage);
  });
  renderKeywordFilter(keywordArray, '#firstSelect', '#first', "1");

});

$.get('data/page-2.json', function (Data) {
  Data.forEach(thing => {
    const newImage = new ImageRender(thing.image_url, thing.keyword, thing.title, thing.description, '2', thing.horns);
      // console.log(newImage.page);

    imagesArray.push(newImage);
    newImage.renderImageToPage();
    newImage.filter('#secondSelect');
  });
  renderKeywordFilter(keywordArray2, '#secondSelect', '#second', "2");
});

$('#page2').on('click', function() {
  $('li').hide();
  if(currentPage === '1'){
    currentPage = '2';
    $('.2').show();
    $('#secondSelect').show();
    $('#firstSelect').hide();
  } else {
    currentPage = '1';
    $('.1').show();
    $('#firstSelect').show();
    $('#secondSelect').hide();
  }

});

$('#sortHorns').on('click', () => {
  $('ul').empty();
  // TODO: need to sort them
  imagesArray.sort((left, right) => {
    if(left.horns > right.horns){
      return 1;
    } else if (left.horns < right.horns){
      return -1;
    } else {
      return 0;
    }
  });

  imagesArray.forEach(img => img.renderImageToPage());
  // $('li').hide();
  $('li').hide();
  if(currentPage === '1'){
    currentPage = '2';
    $('.2').show();
    $('#secondSelect').show();
    $('#firstSelect').hide();

  } else {
    currentPage = '1';
    $('.1').show();
    $('#firstSelect').show();
    $('#secondSelect').hide();
  }
});

$('#sortTitle').on('click', () => {
  $('ul').empty();
  // TODO: need to sort them
  imagesArray.sort((left, right) => {
    if(left.horns > right.horns){
      return 1;
    } else if (left.title < right.title){
      return -1;
    } else {
      return 0;
    }
  });

  imagesArray.forEach(img => img.renderImageToPage());
  // $('li').hide();
  $('li').hide();
  if(currentPage === '1'){
    currentPage = '2';
    $('.2').show();
    $('#secondSelect').show();
    $('#firstSelect').hide();

  } else {
    currentPage = '1';
    $('.1').show();
    $('#firstSelect').show();
    $('#secondSelect').hide();
  }
});