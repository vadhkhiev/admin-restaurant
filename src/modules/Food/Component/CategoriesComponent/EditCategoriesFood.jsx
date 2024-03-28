import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function EditCategoriesFood() {
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  useEffect(() => {}, []);
  return <div>EditCategoriesFood</div>;
}
