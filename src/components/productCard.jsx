import "./productCard.css"
export default function ProductCard(props){
   console.log(props)




    return(
      <div className ="card fancy-border">
          <h1>{props.name}</h1>
           <img src = {props.image}/>
           <p>Price {props.price}</p>
           <button>View more</button>
      </div>
    )
}