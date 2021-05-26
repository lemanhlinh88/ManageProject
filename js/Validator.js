
// đối tương
function Validator (options) {
	var selectorRules = {};
	// hàm xử lí validate
	function valiDate (inputElement , rule){
		var errrorElement = inputElement.parentElement.querySelector(options.errorSelector);
		var errorMessage ;
		// lấy tất cả các rules trong selector
		var rules = selectorRules[rule.selector];

		for(var i = 0; i < rules.length; i++){
			errorMessage = rules[i](inputElement.value);
			if(errorMessage) break;
		}

		if(errorMessage){
			errrorElement.innerText = errorMessage;
			inputElement.parentElement.classList.add('invalid');
		} else {
			errrorElement.innerText = '';
			inputElement.parentElement.classList.remove('invalid');
		}
		return !errorMessage;
	}
	
	// lấy element của form cần validate
	var formElement = document.querySelector(options.form);
	if( formElement ){
		//khi submit form
		formElement.onsubmit = function (e) {
			e.preventDefault();

			var isFormValid = true;

			// lặp qua từng rules và validate tất cả
			options.rules.forEach(function (rule){
				var inputElement = formElement.querySelector(rule.selector);
				var isValid = valiDate( inputElement, rule);
				if(!isValid){
					isFormValid = false;
				}
			});

			if(isFormValid){
				if(typeof options.onSubmit === 'function'){
					var EnableInputs = formElement.querySelectorAll('[name]:not([disabled])');
					var formValues = Array.from(EnableInputs).reduce(function(values, input){
						return (values[input.name] = input.value) && values;
					}, {});
					options.onSubmit(formValues);
				}
			}
		}

		//Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
		options.rules.forEach(function (rule){

			// Lưu lại các rules cho mỗi input
			if( Array.isArray(selectorRules[rule.selector])){
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}


			var inputElement = formElement.querySelector(rule.selector);
			if(inputElement){
				// Xử lí trường hợp blur khỏi input
				inputElement.onblur = function () {
					valiDate( inputElement, rule);
				}

				// xử lí mỗi khi người dùng nhập vào input
				inputElement.oninput = function () {
					var errrorElement = inputElement.parentElement.querySelector('.form-message');
					errrorElement.innerText = '';
					inputElement.parentElement.classList.remove('invalid');
				}
			}
		});
	}
}


// định nghĩa rules
Validator.isRequired = function(selector, message) {
	return {
		selector: selector,
		test: function( value){
			return value.trim() ? undefined : message || 'Vui lòng nhập trường nầy'
		}
	};
}

Validator.isEmail = function(selector, message) {
	return {
		selector: selector,
		test: function(value){
			var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			return regex.test(value) ? undefined : message || 'Trường nầy phải là  email';
		}
	};
}


Validator.minLength = function(selector, min, message) {
	return {
		selector: selector,
		test: function(value){
			return value.length >= min ? undefined : message || `Vui lòng nhập vào tối thiểu ${min} kí tự`;
		}
	};
}

Validator.isConfirmed = function( selector, getCofirmValue, message){
	return{
		selector: selector,
		test: function(value){
			return value === getCofirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
		}
	}
}