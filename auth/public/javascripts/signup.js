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

$('#signup-form').submit(function(e) {
	var postData = $(this).serializeArray();
	var formURL = $(this).attr('action');
	let userId = $('#userid').val();
	let password = $('#passw').val();
	let re_pass = $('#re_pass').val();
	if (password == re_pass) {
		$.ajax({
			url: 'http://127.0.0.1:3000/users/signup',
			dataType: 'json',
			type: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data: { username: userId, password: password },
			//processData: false,
			success: function(data, textStatus, jqXHR) {
				console.log('textStatus', textStatus, '----', jqXHR.status);
				if (jqXHR.status == 200) {
					$('#signup-form').hide();
					$('#login-form').show();
				}

				$('#inform').text('');
				//data: return data from server
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('fail');
				//if fails
			}
		});
	} else {
		$('#inform').text('password and repeat is not match');
	}
	e.preventDefault(); //STOP default action
	return false;
	//e.unbind(); //unbind. to stop multiple form submit.
});

//$("#signup-form").submit();
