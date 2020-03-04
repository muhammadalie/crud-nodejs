// $("#signup-form").submit(function( event ) {
//     //alert( "Handler for .submit() called." );
//     console.log("=================")
//     $.ajax({
//         url: 'http://127.0.0.1:3000/users/signup',
//         dataType: 'text',
//         type: 'POST',
//         contentType: 'application/x-www-form-urlencoded',
//         data: {
//         },
//         processData: false,
//         success: function( data, textStatus, jQxhr ){
//             //$('#response pre').html( JSON.stringify( data ) );
//             console.log(data);
//         },
//         error: function( jqXhr, textStatus, errorThrown ){
//             //console.log( errorThrown )
//             console.warn(jqXhr.responseText);
//         }
//     });
//     event.preventDefault();
//     // return false;
//   });

$('#login-form').submit(function(e) {
	var postData = $(this).serializeArray();
	var formURL = $(this).attr('action');
	let userId = $('#userid_2').val();
	let password = $('#passw_2').val();
	$.ajax({
		url: 'http://127.0.0.1:3000/users/login',
		dataType: 'json',
		type: 'POST',
		contentType: 'application/x-www-form-urlencoded',
		data: { username: userId, password: password },
		//processData: false,
		success: function(data, textStatus, jqXHR) {
			console.log('success', data);
			if (jqXHR.status == 200) {
				$('#login-form').hide();
				$('#user_details').text('Username:  ' + data.user.id);
				for (let c in data.files) {
					// var newElement = document.createElement('div');
					// newElement.id = data.files[c];
					// newElement.className = 'files';
					// newElement.innerHTML = data.files[c];
					// //images = document.getElementById('images');
					// console.log('==========', data.files[c]);
					let newElement = $('<input/>').attr({
						type: 'button',
						id: data.files[c],
						value: data.files[c],
						class: 'image',
						onclick: 'image_downloader(event)'
					});

					$('#images').append(newElement);
					//images.appendChild(newElement);
				}
				$('.user').show();
				$('#images').show();
			}

			//data: return data from server
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('fail');
			//if fails
		}
	});
	e.preventDefault(); //STOP default action
	return false;
	//e.unbind(); //unbind. to stop multiple form submit.
});

//$('#login-form').onclick(function(e) {
//$('.image').on('click', function(event) {
image_downloader = function(e) {
	//var id = this.id;
	var target = event.target || event.srcElement; // IE

	var id = target.id;
	console.log('-------------', id, $(this).attr('id'));

	$.ajax({
		url: 'http://127.0.0.1:3000/store/down',
		dataType: 'json',
		type: 'GET',
		contentType: 'application/x-www-form-urlencoded',
		data: { type: 'image', filename: id },
		//processData: false,
		success: function(data, textStatus, jqXHR) {
			console.log('success', data);
			if (jqXHR.status == 200) {
				console.log('success downloaded');
			}

			//data: return data from server
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('fail');
			//if fails
		}
	});
	e.preventDefault(); //STOP default action
	return false;
	//e.unbind(); //unbind. to stop multiple form submit.
};

//$("#signup-form").submit();
