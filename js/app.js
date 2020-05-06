'use strict';

const images = [];

function ImageRender(image_url, keyword, title, description) {
    this.image_url = image_url;
    this.keyword = keyword;
    this.title = title;
    this.description = description;
}

ImageRender.prototype.renderImageToPage = function() {
  const $imageClone = $('li:first-child').clone();
  $imageClone.attr('id', this.keyword);
  $imageClone.find('h2').text(this.title);
  $imageClone.find('p').text(this.description);
  $imageClone.find('img').attr('src', this.image_url);
  $imageClone.find('img').attr('alt', this.keyword);
  $('ul').append($imageClone)  
}

ImageRender.prototype.renderKeywordFilter = function() {
    if($('select').val() === this.keyword){
        const $optionClone = $('option:first-child').clone();
        $optionClone.text(this.keyword);
        $optionClone.attr('value', this.keyword);
        $('select').append($optionClone);
    }
}
ImageRender.prototype.filter = function(){
$('select').on('change', function(){
   if($(this).children("option:selected").val() !== 'default'){
       $('li').css('display', 'none'); // hides all images
        $(`#${$(this).children("option:selected").val()}`).css('display', '');
   }
})}


$.get('data/page-1.json', function(Data){
    Data.forEach(thing => {
      const newImage = new ImageRender(thing.image_url, thing.keyword, thing.title, thing.description);
    //   console.log(newImage);
      newImage.renderImageToPage();
      newImage.renderKeywordFilter();
      newImage.filter();
      images.push(newImage);
    });
  });