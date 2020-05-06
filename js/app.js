'use strict';

const imagesArray = [];
const keywordArray = [];

function ImageRender(image_url, keyword, title, description) {
    this.image_url = image_url;
    this.keyword = keyword;
    this.title = title;
    this.description = description;
    if(!keywordArray.includes(this.keyword)){
        keywordArray.push(this.keyword)
    }
}

ImageRender.prototype.renderImageToPage = function() {
  const $imageClone = $('li:first-child').clone();
  $imageClone.attr('id', this.keyword);
  $imageClone.attr('class', this.keyword);
  $imageClone.find('h2').text(this.title);
  $imageClone.find('p').text(this.description);
  $imageClone.find('img').attr('src', this.image_url);
  $imageClone.find('img').attr('alt', this.keyword);
  $('ul').append($imageClone)  
}

function renderKeywordFilter() {
        // console.log(keywordArray);
        const $optionClone = $('option:first-child').clone();
        $optionClone.text('display all');
        $optionClone.attr('value', 'display-all');
        $('select').append($optionClone);
        keywordArray.forEach((a, index) => {
            const $optionClone2 = $('option:first-child').clone();
            $optionClone2.text(keywordArray[index]);
            // console.log($optionClone.text(keywordArray[index]));
            $optionClone2.attr('value', keywordArray[index]);
            // console.log($optionClone);
            $('select').append($optionClone2);
            // console.log($optionClone);

        })

        
    }
    // }else {
    //     $optionClone.remove();
        
    // }
    

    // console.log($('select').children('option').val())
ImageRender.prototype.filter = function(){
$('select').on('change', function(){
   if($('select').children('option:selected').val() !== 'default'){
       $('li').css('display', 'none'); // hides all images
        $(`#${$('select').children('option:selected').val()}`).each(function () {

            $(`.${$('select').children('option:selected').val()}`).css('display', '');
        })


   }
   if($(this).children("option:selected").val() === 'display-all'){
    $('li').css('display', '');
   }
})}


$.get('data/page-1.json', function(Data){
    Data.forEach(thing => {
      const newImage = new ImageRender(thing.image_url, thing.keyword, thing.title, thing.description);
    //   console.log(newImage);
      newImage.renderImageToPage();
      newImage.filter();
      imagesArray.push(newImage);
    });
renderKeywordFilter();

  });