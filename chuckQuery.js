(function ($) {
    $.fn.getCategories = function(getJokeButton) {
        $(this).html(''); // make sure its empty
        $(getJokeButton).prop('disabled', true); // disable button until we have options
        return $.ajax('https://api.chucknorris.io/jokes/categories', {
            method: 'GET',
            success: (result) => {
                $('<option></option>').val(undefined).html("-")
                    .appendTo(this); // add blank placeholder
                result.push('random'); // append 'random' selection                   
                result.sort(); // sort alphabetically  
                $.each(result, (index, item) => {
                    $('<option></option>').val(item).html(item)
                        .appendTo(this);
                })
                $(getJokeButton).prop('disabled', false); // re-enable button
            },
            error: () => {
                alert('Something went wrong querying Chuck Norris API! No jokes today :(');
            }
        });
    };
    $.fn.getJoke = function(category) {
        let url = 'https://api.chucknorris.io/jokes';

        if (category !== '' && category !== 'random') {
            url = url + '/random?category=' + category;
            $('#ModalLabel').text(category);
            // $('#ModalLabel').text(category);
        }

        else if (category == 'random' || category == ''){
            url = url + '/random'
            $('#ModalLabel').text('random');
            $('#ModalLabel').css("background-color", "yellow");
            $('#category-dropdown').val('random');
        }
        
        $.ajax(url, {
            context: this,
            method: "GET",
            beforeSend: function () {
                this.html('Loading...');
            },
            success: function (result) {
                this.html('<strong>' + result['value'] + '</strong>');
            },
            error: function (err) {
                let e =
                    '<div style="background-color:red;"><strong> Something went wrong! Chuck Norris is not pleased..' +
                    'We encountered the following error:<p>' +
                    err.error + '</p></strong></div>'
                this.html(e);
            }
        });
        return this;
    };
}(jQuery));