const images = [
    'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg',
    'https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg'
];

const gallery_content = [
    {image:"assets/img/1.png", filter:"col-lg-4 col-md-6 portfolio-item filter-2023", title:"2023 web"},
    {image:"assets/img/1.png", filter:"col-lg-4 col-md-6 portfolio-item filter-2023", title:"2023 web"},

]

for(var k = 0; k < gallery_content.length;k++){
    document.getElementById('galleryImg').src = gallery_content[k].image
    document.getElementById('title').setAttribute('title',gallery_content[k].title) 
}


/*
const container = document.getElementById('image-container');

for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    container.appendChild(img);
}

*/