// Application form
document.getElementById("dob").defaultValue = "2000-01-01";
var fileName = "";


function application() {
  window.open("https://forms.gle/ACfRkMGX8wL43GR79")
}


// submit application
function submitApplication() {
  var idno = document.getElementById("idno").value;
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var dob = document.getElementById("dob").value;
  var studNo = document.getElementById("studNo").value;
  var email = document.getElementById("email").value;
  var phoneNo = document.getElementById("phoneNo").value;
  var campus = document.getElementById("campus").value;
  var course = document.getElementById("course").value;
  var outstanding = document.getElementsByName("outstanding").value;
  var town = document.getElementById("town").value;
  var code = document.getElementById("code").value;
  var houseNo = document.getElementById("houseNo").value;
  var streetName = document.getElementById("streetName").value;
  var accpt = document.getElementById("accept").value;
  var gender = document.getElementById("gender").value;


  //testing
  idno = "1236547890123";
  firstname = "Kamo";
  lastname = "Mthethwa";
  dob= "2002-01-01";
  studNo = "123456789";
  email= "kamo@gmail.com";
  phoneNo = "0123456789";
  campus = "tut-ema";
  course = "	DPIT20";
  outstanding = "No";
  town = "Sosha";
  code = "0152";
  houseNo = "1235";
  streetName= "Tswelopele";
  //accept = "true";
   gender = "Male";



  var alphatesSpace = /^[a-zA-Z]+$/;
  var digits = /^\d+$/;

  console.log(campus);
  console.log(course);
  //console.log(filterCampuses[0].campus_id)


  //  validate firstname
  if (firstname == "") {
    alert("Enter firstname")
    return;
  }
  // if (firstname.length > 3) {
  //   alert("firstname should contain at least 3 characters")
  //   return;
  // }

  // if (!alphatesSpace.test(firstname)) {
  //   alert("firstname should contail alphates/letters only")
  //   return;
  // }

  //  validate lastname
  if (lastname == "") {
    alert("Enter lastname")
    return;
  }
  // if (lastname.length > 3) {
  //   alert("lastname should contain at least 3 characters")
  //   return;
  // }

  // if (!alphatesSpace.test(lastname)) {
  //   alert("lastname should contail alphates/letters only")
  //   return;
  // }


  // Validate SA ID
  if (idno == "") {
    alert("Enter ID number")
    return;
  }
  if (idno.length != 13) {
    alert("SA Id should contain 13 Characters")
    return;
  }

  if (!idno.match(digits)) {
    alert("SA Id should contain only number")
    return;
  }


  if (dob == "") {
    alert("Select date of birth")
    return;
  }


  if (studNo == "") {
    alert("Enter student number");
    return;
  }
  if (!studNo.match(digits)) {
    alert("Student number should contain only number")
  }


  var data = {
    idno, firstname, lastname, dob, studNo, email, phoneNo, gender, campus, outstanding, town, code, houseNo, streetName, fileName, accpt
  }

  console.log(data);
}

// get all open courses and campuses
function getCampusDataAndSpecializations() {
  fetch('http://localhost:3001/api/getCampuses')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        var AllCampuses = data.results
        var campuses = `<option value='' disabled selected>---Select Campus---</option>`
        AllCampuses.forEach(campus => {
          campuses += `<option value='${campus.campus_id}' >${campus.campus_name}</option> `;
        })
        document.getElementById('campus').innerHTML = campuses;
      }
      else {
        console.log(data.message)
        alert(data.message)
      }
      console.log(AllCampuses)
    })
    .catch(error => console.error('Error:', error));

  fetch('http://localhost:3001/api/getCourse')
    .then(response => response.json())
    .then(data => {
      
      if (data.success) {
        var AllCourses = data.results
        var courses = `<option value='' disabled selected>---Select Course---</option>`
        AllCourses.forEach(course => {
          courses += `<option value='${course.course_id}' >${course.course_name}</option> `;
        })
        document.getElementById('course').innerHTML = courses;
      }
      else {
        console.log(data.message)
        alert(data.message)
      }
      console.log(data)
    })
    .catch(error => console.error('Error:', error));


}


// uploading files
document.addEventListener('DOMContentLoaded', () => {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  fileInputs.forEach((fInput) => {
    const container = fInput.closest('.form-outline');
    const pBar = container.querySelector('.progress-bar');
    const pText = container.querySelector('.progress-text');
    const fName = container.querySelector('.file-name');

    fInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onloadstart = () => {
          pBar.style.width = '0%';
          pText.style.display = 'block';
          pText.innerText = '0%';
        };

        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            pBar.style.width = `${progress}%`;
            pText.innerText = `${Math.round(progress)}%`;
          }
        };

        reader.onload = () => {
          const uploadTime = 4000;
          const interval = 50;
          const steps = uploadTime / interval;
          let currentStep = 0;

          const updateProgress = () => {
            const progress = (currentStep / steps) * 100;
            pBar.style.width = `${progress}%`;
            pText.innerText = `${Math.round(progress)}%`;
            currentStep++;

            if (currentStep <= steps) {
              setTimeout(updateProgress, interval);
            } else {
              pBar.style.width = '100%';
              pText.innerText = '100%';
              fName.innerText = `File Name: ${file.name}`;
            }
          };

          setTimeout(updateProgress, interval);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid PDF file.');
        fInput.value = '';
      }
    });
  });
});




// invoke the functions
getCampusDataAndSpecializations();

