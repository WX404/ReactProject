import React from "react";
import $ from "jquery";
import "../assets/css/uploadPictures.css";

class PicturesWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: null,
            textValue: props.textValue,
            isRelease: false
        };
    }

    uploadItem() {
        $(".pictureswall-form-input").click();
    }

    inputChange() {
        let uploadBtn = $(".pictureswall-form-input")[0];
        let filePath = URL.createObjectURL(uploadBtn.files[0]);
        $(".pictureswall-upload-img").attr('src', filePath);
        this.setState({
            fileList: uploadBtn.files
        })
    }
    
    Release() {    
        let that = this;    
        let text = this.props.textValue;
        let imgList = this.state.fileList[0];
    	if (text || imgList) {
            let formData = new FormData()
            formData.append("text",text);
            formData.append("imgData",imgList);
            formData.append("username",sessionStorage.getItem("username"))
            $.ajax({
    			url: "http://localhost:8000/uploadTravelnotes",
    			type: "post",    			
                data: formData,
                dataType: "text",                
                contentType: false,
                processData:false,
    			success: function (res) {
                    that.setState({isRelease: true})                        
                        $(".release-tip").css("display","block")                    
                    setTimeout(()=>{
                        $(".pictureswall-upload-img").attr("src","")
                        $(".release-tip").css("display","none")
                    },1000)
    			}
            })
    	}
    }
        
    render() {
        return (
            <div className="pictureswall">
                <div className="pictureswall-upload">
                    <div className="pictureswall-upload-item" >
                        <img className="pictureswall-upload-img" src="" alt="" />                        
                        <div className="pictureswall-upload-tip" onClick={this.uploadItem.bind(this)}>upload+</div>
                        <form className="pictureswall-form">
                            <input type="file" className="pictureswall-form-input" onChange={this.inputChange.bind(this)} />
                        </form>                        
                    </div>
                </div>
                <div className="release-button" onClick={this.Release.bind(this)}>发布</div>
                <div className="release-tip">发布成功</div>
            </div>
        );
    }
}

export default PicturesWall;





