import DescriptionGenerator from "@/features/description-generator/description-generator";
import "./card-description.scss";

const CardDescription = () => {
  return (
    <div className="card-description">
      <div className="card-description__header">
        <p className="card-description__header-title">Описание карточки товара </p>
        <p className="card-description__header-text">
          Инструмент автоматически создает продающие и информативные тексты для маркетплейсов, учитывая характеристики продукта, целевую аудиторию и
          SEO-ключи, чтобы увеличить привлекательность товаров и улучшить их видимость.
        </p>
      </div>

      <div className="card-description__generate">
        <DescriptionGenerator />
      </div>
    </div>
  );
};

export default CardDescription;
