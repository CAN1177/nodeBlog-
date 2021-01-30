class BaseModel {
	constructor(data,message) {
		if (typeof data ==="string") {
			this.message = data;
			data =null;
			message =null
		}
		if (data) { //data is object
			this.data=data;
		}
		if (message) { // message is string
			this.message= message;
		}
	}
}

class SuccessModel extends BaseModel {
	constructor(data,message) {
		super(data,message)
		this.error =0
	}
}

class ErrorModel extends BaseModel {
	constructor(data,message){
		super(data,message)
		this.error =-1
	}
}

module.exports ={
	SuccessModel,
	ErrorModel
}