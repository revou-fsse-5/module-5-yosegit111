Hi I created an Online Shop called AnythingShop, where you can buy anything
<img width="1207" alt="image" src="https://github.com/user-attachments/assets/42b6ee2c-1cf8-4e4c-9ddb-f939b7d8c344">

I created this shop by first creating the skeleton based off of what the task require: Home Page, Product Catalogue, Cart, and Register and Log In function. 

And these are the tech stacks I use:
- React
- Tailwind CSS
- Typescript
- Formik and Yup for forms

The first step of creating this web page is by accordingly routing each page on App.tsx. 

After that, I started off with the Product Catalogue page. 
<img width="1387" alt="image" src="https://github.com/user-attachments/assets/46307840-a3a4-4cce-8420-7d4fe6b5bf4f">

For this page, I used this api instead: https://fakestoreapi.com/
Because I found that it is more stable than one suggested on the assignment document. 

On here, I tried to implement product category filtering. 
<img width="1380" alt="image" src="https://github.com/user-attachments/assets/8c78c762-218e-452e-902f-371599f28b58">

To access different categories, we can also go to the Product Category page first.
<img width="1391" alt="image" src="https://github.com/user-attachments/assets/118627d5-f679-454a-8398-deb86114d340">

Once a category is selected, we'll be redirected to the Product Listing Page, but with a pre-filter on. To do this, we use the useCallback function. 
<img width="738" alt="image" src="https://github.com/user-attachments/assets/01955d5e-d1f5-4def-8bfe-3bed76249abd">

Other than playing with the categories, we can also show more details of the product. It will redirect us to the details page.
<img width="1409" alt="image" src="https://github.com/user-attachments/assets/575b63ec-37e6-47c6-828e-623954a17fb9">

Either from here or from the product catalogue page, we can add product into cart. When product is added to cart, I put an alert box.
<img width="1304" alt="image" src="https://github.com/user-attachments/assets/3644a361-ce18-430b-a7cf-9e993ed2bfdd">

<img width="1422" alt="image" src="https://github.com/user-attachments/assets/7ecd5d86-8de6-4620-a825-1a90bf616eea">

And product is successfully added to cart as above. 
To generate this result, I use CartContext to navigate the product flow to the cart. In this, I also add functionalities such as remove from cart, update quantity, and also clear cart. 
<img width="561" alt="image" src="https://github.com/user-attachments/assets/7385a9b9-794d-4d1c-8719-ca6e9081a7c7">

This is a very challenging aspect of the assignment, but I did get a lot of helps from online Youtube tutorials doing exactly the same. 

When we want to Checkout, but have not logged in yet. The page will redirect us to Login page. 
<img width="411" alt="image" src="https://github.com/user-attachments/assets/ee0fe2ed-36a7-404c-a624-7f5671695a7c">

For the Login & Registration function, I also utilize the API from https://fakestoreapi.com/. 
<img width="363" alt="image" src="https://github.com/user-attachments/assets/4a69e551-84eb-4862-a8d7-33e8abb8c7cb">


Therefore, only registered users can login. And new users should Register first before being able to login and eventually check out. 

For this, I utilize AuthContext, where it tracks both existing users fetched from API and also newly registered users from the local storage. I also use the Regex function for password error-handling, to ensure that users utilize alphabet, numbers, and symbols.
<img width="902" alt="image" src="https://github.com/user-attachments/assets/19e2261f-345a-4b4f-8a2d-8e9937adf991">

That's all about my website. Unfortunately I had difficulty deploying as I'm still unsure about the deployment method and some files located oddly (for example I have some package.json files both inside and outside of online-shop folder).
But I'll fix that as soon as possible!

