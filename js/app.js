'use strict';

const imagesArray = [];
const keywordArray = [];
const keywordArray2 = [];
const imagesArray2 = [];

function ImageRender(image_url, keyword, title, description, page) {
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  this.description = description;
  this.page = page;
  if (!keywordArray.includes(this.keyword) && this.page === '1') {
    keywordArray.push(this.keyword)
}else if(!keywordArray2.includes(this.keyword) && this.page === '2'){
    keywordArray2.push(this.keyword)
}
}

ImageRender.prototype.renderImageToPage = function () {
  const $imageClone = $('li:first-child').clone();
  $imageClone.attr('id', this.keyword);
  $imageClone.addClass(this.keyword);
  $imageClone.addClass(this.page);
  console.log(this.page);
  $imageClone.find('h2').text(this.title);
  $imageClone.find('p').text(this.description);
  $imageClone.find('img').attr('src', this.image_url);
  $imageClone.find('img').attr('alt', this.keyword);
  $('ul').append($imageClone);
};

function renderKeywordFilter(array, select, firstOption) {
  // console.log(keywordArray);
  const $optionClone = $(firstOption).clone();
  $optionClone.text('display all');
  $optionClone.attr('value', 'display-all');
  $(select).append($optionClone);
  array.forEach((a, index) => {
    const $optionClone2 = $(firstOption).clone();
    $optionClone2.text(array[index]);
    $optionClone2.attr('value', array[index]);
    $(select).append($optionClone2);
  })
}

ImageRender.prototype.filter = function (select) {
  $(select).on('change', function () {
    if ($(select).children('option:selected').val() !== 'default') {
      $('li').css('display', 'none'); // hides all images
      $(`#${$(select).children('option:selected').val()}`).each(function () {

        $(`.${$(select).children('option:selected').val()}`).css('display', '');
      })


    }
    if ($(this).children("option:selected").val() === 'display-all') {
      $('li').css('display', '');
    }
  })
}


$.get('data/page-1.json', function (Data) {
  Data.forEach(thing => {
    const newImage = new ImageRender(thing.image_url, thing.keyword, thing.title, thing.description, '1');
    //   console.log(newImage);
    newImage.renderImageToPage();
    newImage.filter('#firstSelect');
    imagesArray.push(newImage);
  });
  renderKeywordFilter(keywordArray, '#firstSelect', '#first');

});

$.get('data/page-2.json', function (Data) {
  Data.forEach(thing => {
    const newImage = new ImageRender(thing.image_url, thing.keyword, thing.title, thing.description, '2');
    //   console.log(newImage);

    imagesArray2.push(newImage);
    newImage.renderImageToPage();
    newImage.filter('#secondSelect');
  });
  renderKeywordFilter(keywordArray2, '#secondSelect', '#second');
});

$('#page2').on('click', function() {
  $('.1').hide();
  $('header :nth-child(3)').hide();
  $('header :nth-child(4)').show();

});