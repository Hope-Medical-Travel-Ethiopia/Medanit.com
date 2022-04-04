import React from "react";
export function Carousel({
  responsive,
  item
}) {
  return <Carousel partialVisible={true} // centerMode={true}
  responsive={responsive} infinite={true} keyBoardControl={true} autoPlaySpeed={3000} draggable={true} swipeable={true} className="w-100">
        {reviewProp.map(item => <Review reviewProp={item} key={item.name} />)}
      </Carousel>;
}
  