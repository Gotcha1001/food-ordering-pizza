import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
          <div onClick={onClick}>Add To Cart R {basePrice}</div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="bg-primary text-white rounded-full px-8 py-3 mt-4"
      onClick={onClick}
    >
      <span>Add to cart (from R {basePrice}) </span>
    </button>
  );
}
