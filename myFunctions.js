/*استدعاء البيانات من ملف json*/
/*اخذ الكائنات من داخل المصفوفة في ملف json*/
fetch("file.json")
    .then(res => res.json())
    .then(data => 
    {
        handeldata(data);/*ارسال البيانات من ملف جيسون الى دالة*/
    });

     /*الدالة تدخل الى المصفوفة وتاخد كل كائن على حدا لترسله الى الطريقة creatrow*/
function handeldata(myflats)
{
    const flat = document.getElementById("myflats");/*متغير */
    myflats.forEach(myflat => 
    {
        let flat1 = creatrow(myflat);
        let flatdetails=addDetail(myflat);
        flat.appendChild(flat1)
        flat.appendChild(flatdetails)
    });
}    
/*اصبحت الكائنات ضمن هذه الدالة*/
/*اجرائية انشاء سطور الجدول*/
    function creatrow(myflat)
    {
        const row = document.createElement("tr");
        for (let i = 0; i < 5; i++)/*انشاء 5خلايا*/
        {
            const cell = document.createElement("td");
            row.appendChild(cell);/*اضافة الخلايا الى السطر*/
        }
        /*اضافة بيانات الشقة الى السطر*/
        row.children[0].textContent = `${myflat.City}`;

        row.children[1].textContent = `${myflat.Details}`;

        row.children[2].textContent = `${myflat.Rmonthly}`;
        

        const check = document.createElement("input");/*انشاء زر اظهار التفاصيل*/
        check.setAttribute("type", "checkbox");
        check.onclick=function()/*دالة اظهار التفاصيل*/
        {
            check.parentElement.parentElement.nextElementSibling.classList.toggle("hidden");
        }
        row.children[3].appendChild(check);


        const radio = document.createElement("input");/*انشاء زر اختيار*/
        radio.setAttribute("type", "radio");
        
        row.children[4].appendChild(radio);
        
        return row;
    }

    /* اجرائية ملئ تفاصيل الشقة */
    function addDetail(myflat)
    {
        const row = document.createElement("tr");
        row.classList.add("hidden")/*اخفاء تفاصيل الشقة*/
        
        row.innerHTML=`
        <td colspan="5">
                                <div class="Details">
                                    <ul class="Information">
                                        <li> المنطقة:${myflat.Area} </li>
                                        <li>كراج: ${myflat.Garage}</li>
                                        <li>الطابق: ${myflat.Floor}</li>
                                        <li>الملكية: ${myflat.Owner}</li>
                                        <li>بلكون: ${myflat.Balcon}</li>
                                        <li>مفروشة: ${myflat.Furnished}</li>  
                                    </ul>
                                    <!--مسطرة افقية-->
                                   <hr color="black" size="1" />
                                    <br />
                                     
                                    <div class="image">
                                        <img src="${myflat.img1}" alt="" />
                                        <img src="${myflat.img2}" alt="" />
                                        <img src="${myflat.img3}" alt="" />
                                        <img src="${myflat.img4}" alt="" />  
                                    </div>
                                </div>
                            </td>`
                            return row;
    }

       /*اجرائية فتح النموذج*/
    function openForm() 
    {
        document.getElementById("myForm").style.display = "block";
    }
    /*اجرائية التحقق من صحة المدخلات في النموذج*/
    function validateForm() 
    {
        /*الحصول على قيم المدخلات*/
        var FName = document.getElementById("name").value;/*التحقق من صحة الاسم*/
        var NID = document.getElementById("id").value;/*التحقق من صحة الرقم الوطني*/
        var BD = document.getElementById("date").value;/*التحقق من تاريخ الولادة*/
        var Mob = document.getElementById("phone").value;/*التحقق من صحة الموبايل*/
        var Mail = document.getElementById("email").value;/*التحقق من صحة الايميل*/
        var captcha = document.getElementById("captcha").value;/*التحقق من صحة رمز كابتشا المدخل*/
        var captchaValue = document.getElementById("captcha-image").alt;/*الحصول على قيمة رمز كابتشا الحقيقية*/
        
        var valid = true;/*متغير للتحقق من صحة الرمز*/
        
    /*التحقق من ان الاسم يحتوي على احرف هجائية عربية فقط*/
        var namePattern = /^[أ-ي\s]+$/;
        if (!namePattern.test(FName)){
        alert("الاسم يجب أن يحتوي على أحرف هجائية فقط باللغة العربية");
        valid = false;
    }
    /*التحقق من ان الرقم الوطني يتكون من 11خانة والخانتين على اليسار ترمزان الى المحافظة*/
    var idPattern = /^(01|02|03|04|05|06|07|08|09|10|11|12|13|14)\d{9}$/;
    if (!idPattern.test(NID)){
        alert("الرقم الوطني يجب أن يحتوي على 11 خانة والخانتين على اليسار ترمزان الى المحافظة");
        valid = false;
    }
     /*التحقق ان تاريخ الميلاد ياخذ الشكل dd-mm-yyyy*/
     var datePattern = /^\d{2}-\d{2}-\d{4}$/;
     if (!datePattern.test(BD)) {
         alert("تاريخ الولادة يجب أن يأخذ الشكل dd-mm-yyyy");
         valid = false;
     }
     /*التحقق ان رقم الموبايل يطابق ارقام شبكات syriatel ,MTN*/
    var phonePattern = /^(09|094|095)\d{7}$/;
    if (!phonePattern.test(Mob)) {
        alert("رقم الموبايل يجب أن يطابق أرقام شبكتي Syriatel و MTN");
        valid = false;
    }
     /*التحقق ان الايميل يحتوي على علامات )@-.( */
     var emailPattern = /@.*\./;
     if (!emailPattern.test(Mail)) {
         alert("يجب ان يحتوى الايميل على @ و .");
         valid = false;
     }
      /* التحقق من الرمز captcha اذا كان يطابق الرمز الحقيقي*/
    if (captcha != captchaValue) {
        alert("الرمز captcha غير صحيح");
        valid = false;
    }
    /* اذا كانت جميع المدخلات صحيحة*/
    if (valid) {
        var myflats = document.getElementById("myflats").row.innerHTML;
        alert("شكراً لك على طلبك. المجموع النهائي هو: " + myflats);
    }
    return valid;
    }
/*توليد الكابتشا*/
    function generateCaptcha() {
        var captchaText = generateRandomString(6);
        document.getElementById("captcha").value = "";
        document.getElementById("captcha").placeholder = captchaText;
        document.getElementById("captchaImage").src = "https://dummyimage.com/150x50/000/fff&text=" + captchaText;
    } 
    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    function changeCaptcha() {
        generateCaptcha();
    }

  