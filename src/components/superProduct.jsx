import ProductCard from "./productCard";

export default function SuperProduct(){
   
    return(
      <div>
          <h1>Feature this week!!!</h1>
           <ProductCard 
               name ="Samsung A22"
               price = "$100/="
               image = "https://picsum.photos/id/2/200/300"/>
      </div>
    )
}