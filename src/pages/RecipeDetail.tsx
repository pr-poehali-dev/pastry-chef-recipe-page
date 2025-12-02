import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const recipesData = [
  {
    id: 1,
    title: 'Медовик классический',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&h=800&fit=crop',
    time: 60,
    difficulty: 'Средняя',
    servings: 8,
    ingredients: [
      { item: 'Мёд', amount: '100 г' },
      { item: 'Мука пшеничная', amount: '400 г' },
      { item: 'Яйца', amount: '3 шт' },
      { item: 'Сметана 20%', amount: '500 г' },
      { item: 'Сахар', amount: '200 г' },
      { item: 'Сливочное масло', amount: '100 г' },
      { item: 'Сода', amount: '1 ч.л.' },
    ],
    description: 'Классический медовик — это торт с тонкими медовыми коржами и нежным сметанным кремом. Этот рецепт проверен временем и всегда получается идеально!',
    steps: [
      { step: 1, text: 'Растопите мёд и сливочное масло на водяной бане, добавьте сахар и яйца. Перемешайте до однородности.', time: 10 },
      { step: 2, text: 'Добавьте соду (масса начнёт пениться и светлеть). Постепенно всыпьте просеянную муку и замесите мягкое тесто.', time: 5 },
      { step: 3, text: 'Разделите тесто на 8-10 частей. Раскатайте каждую часть в тонкий пласт по размеру формы.', time: 15 },
      { step: 4, text: 'Выпекайте каждый корж при 180°C около 3-4 минут до золотистого цвета.', time: 30 },
      { step: 5, text: 'Приготовьте крем: взбейте сметану с сахаром до устойчивых пиков.', time: 5 },
      { step: 6, text: 'Смажьте каждый корж кремом, соберите торт. Обрезки коржей измельчите и посыпьте верх и бока торта.', time: 10 },
      { step: 7, text: 'Оставьте торт в холодильнике на 8-12 часов для пропитки.', time: 480 },
    ],
    tips: [
      'Не переварите мёд — он может потерять свой аромат',
      'Коржи должны быть очень тонкими для лучшей пропитки',
      'Чем дольше торт пропитывается, тем вкуснее он становится',
    ],
  },
  {
    id: 2,
    title: 'Шоколадный брауни',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200&h=800&fit=crop',
    time: 45,
    difficulty: 'Легкая',
    servings: 12,
    ingredients: [
      { item: 'Горький шоколад 70%', amount: '200 г' },
      { item: 'Сливочное масло', amount: '150 г' },
      { item: 'Яйца', amount: '3 шт' },
      { item: 'Мука', amount: '100 г' },
      { item: 'Сахар', amount: '180 г' },
      { item: 'Грецкие орехи', amount: '100 г' },
      { item: 'Какао-порошок', amount: '30 г' },
      { item: 'Ванильный экстракт', amount: '1 ч.л.' },
    ],
    description: 'Влажный и насыщенный шоколадный брауни с хрустящей корочкой снаружи и тягучей серединкой внутри.',
    steps: [
      { step: 1, text: 'Разогрейте духовку до 180°C. Застелите форму 20×30 см пергаментом.', time: 5 },
      { step: 2, text: 'Растопите шоколад и масло на водяной бане, постоянно помешивая.', time: 7 },
      { step: 3, text: 'Взбейте яйца с сахаром до пышной массы (около 5 минут).', time: 5 },
      { step: 4, text: 'Добавьте в яичную массу шоколадную смесь и ванильный экстракт. Перемешайте.', time: 3 },
      { step: 5, text: 'Просейте муку с какао и аккуратно вмешайте в тесто. Добавьте рубленые орехи.', time: 5 },
      { step: 6, text: 'Вылейте тесто в форму и выпекайте 20-25 минут. Серединка должна оставаться слегка влажной.', time: 25 },
      { step: 7, text: 'Полностью остудите перед нарезкой. Нарежьте на квадраты.', time: 30 },
    ],
    tips: [
      'Не перепекайте — брауни должен быть влажным внутри',
      'Используйте качественный шоколад с содержанием какао не менее 70%',
      'Для проверки готовности вставьте зубочистку — на ней должны остаться влажные крошки',
    ],
  },
  {
    id: 3,
    title: 'Эклеры с заварным кремом',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=1200&h=800&fit=crop',
    time: 90,
    difficulty: 'Сложная',
    servings: 15,
    ingredients: [
      { item: 'Вода', amount: '250 мл' },
      { item: 'Сливочное масло', amount: '100 г' },
      { item: 'Мука', amount: '150 г' },
      { item: 'Яйца', amount: '4 шт' },
      { item: 'Соль', amount: 'щепотка' },
      { item: 'Молоко (для крема)', amount: '500 мл' },
      { item: 'Сахар (для крема)', amount: '150 г' },
      { item: 'Желтки', amount: '4 шт' },
      { item: 'Ванильный стручок', amount: '1 шт' },
      { item: 'Шоколад для глазури', amount: '100 г' },
    ],
    description: 'Классические французские эклеры с воздушным заварным тестом и нежным ванильным кремом.',
    steps: [
      { step: 1, text: 'Доведите воду с маслом и солью до кипения. Снимите с огня и быстро всыпьте всю муку сразу.', time: 5 },
      { step: 2, text: 'Интенсивно перемешивайте до образования гладкого шара теста. Верните на огонь на 1 минуту.', time: 3 },
      { step: 3, text: 'Немного остудите тесто и по одному вводите яйца, каждый раз тщательно перемешивая.', time: 10 },
      { step: 4, text: 'Переложите тесто в кондитерский мешок с круглой насадкой. Отсадите на противень полоски длиной 10-12 см.', time: 10 },
      { step: 5, text: 'Выпекайте при 200°C 10 минут, затем при 180°C ещё 20-25 минут. Не открывайте духовку!', time: 35 },
      { step: 6, text: 'Для крема: вскипятите молоко с ванилью. Взбейте желтки с сахаром, добавьте молоко. Варите до загустения.', time: 15 },
      { step: 7, text: 'Остудите крем, наполните эклеры. Покройте растопленным шоколадом.', time: 20 },
    ],
    tips: [
      'Не открывайте духовку во время выпечки — эклеры опадут',
      'Тесто должно быть блестящим и тягучим',
      'Крем нужно постоянно мешать, чтобы не было комочков',
    ],
  },
  {
    id: 4,
    title: 'Лимонный тарт',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200&h=800&fit=crop',
    time: 75,
    difficulty: 'Средняя',
    servings: 8,
    ingredients: [
      { item: 'Мука (для основы)', amount: '200 г' },
      { item: 'Холодное масло', amount: '100 г' },
      { item: 'Сахарная пудра', amount: '50 г' },
      { item: 'Яйцо', amount: '1 шт' },
      { item: 'Лимоны', amount: '4 шт' },
      { item: 'Сахар (для крема)', amount: '200 г' },
      { item: 'Яйца (для крема)', amount: '4 шт' },
      { item: 'Сливочное масло (для крема)', amount: '100 г' },
    ],
    description: 'Освежающий французский десерт с хрустящей песочной основой и нежным лимонным кремом.',
    steps: [
      { step: 1, text: 'Смешайте муку, нарезанное кубиками холодное масло и сахарную пудру в крошку. Добавьте яйцо.', time: 10 },
      { step: 2, text: 'Быстро замесите тесто, заверните в пленку и охладите 30 минут.', time: 35 },
      { step: 3, text: 'Раскатайте тесто и выложите в форму диаметром 24 см. Наколите вилкой.', time: 10 },
      { step: 4, text: 'Выпекайте основу при 180°C 15-20 минут до золотистого цвета.', time: 20 },
      { step: 5, text: 'Приготовьте крем: взбейте яйца с сахаром, добавьте сок и цедру лимонов.', time: 5 },
      { step: 6, text: 'Варите крем на водяной бане до загустения (около 10 минут). Снимите с огня, добавьте масло.', time: 15 },
      { step: 7, text: 'Вылейте крем в основу, разровняйте. Охладите в холодильнике минимум 2 часа.', time: 120 },
    ],
    tips: [
      'Используйте только свежевыжатый лимонный сок',
      'Не переварите крем — он должен быть кремовым, а не резиновым',
      'Для красивой подачи украсьте дольками лимона и мятой',
    ],
  },
  {
    id: 5,
    title: 'Макаруны ассорти',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=1200&h=800&fit=crop',
    time: 120,
    difficulty: 'Сложная',
    servings: 30,
    ingredients: [
      { item: 'Миндальная мука', amount: '200 г' },
      { item: 'Сахарная пудра', amount: '200 г' },
      { item: 'Яичные белки', amount: '150 г (от 5 яиц)' },
      { item: 'Сахар', amount: '200 г' },
      { item: 'Вода', amount: '50 мл' },
      { item: 'Пищевые красители', amount: 'по желанию' },
      { item: 'Ганаш или крем', amount: '200 г' },
    ],
    description: 'Изящные французские печенья с гладкой глянцевой поверхностью и нежной текстурой.',
    steps: [
      { step: 1, text: 'Просейте миндальную муку с сахарной пудрой дважды. Отложите.', time: 10 },
      { step: 2, text: 'Разделите белки на две части. Одну часть смешайте с миндальной массой.', time: 5 },
      { step: 3, text: 'Сварите сироп из сахара и воды до 118°C. Взбейте вторую часть белков до мягких пиков.', time: 10 },
      { step: 4, text: 'Влейте горячий сироп тонкой струйкой во взбитые белки, продолжая взбивать до остывания.', time: 10 },
      { step: 5, text: 'Смешайте обе массы. Добавьте краситель. Выполните макаронаж (перемешивание до правильной консистенции).', time: 15 },
      { step: 6, text: 'Отсадите круглые заготовки на противень. Оставьте подсохнуть 30-40 минут до образования корочки.', time: 40 },
      { step: 7, text: 'Выпекайте при 150°C 12-14 минут. Остудите полностью, склейте кремом попарно.', time: 30 },
    ],
    tips: [
      'Влажность в помещении — главный враг макарун',
      'Правильный макаронаж — ключ к успеху. Тесто должно течь лентой',
      'Обязательно дайте заготовкам подсохнуть перед выпечкой',
    ],
  },
  {
    id: 6,
    title: 'Тирамису',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1200&h=800&fit=crop',
    time: 30,
    difficulty: 'Легкая',
    servings: 6,
    ingredients: [
      { item: 'Маскарпоне', amount: '500 г' },
      { item: 'Печенье Савоярди', amount: '300 г' },
      { item: 'Крепкий кофе', amount: '300 мл' },
      { item: 'Яйца', amount: '4 шт' },
      { item: 'Сахар', amount: '100 г' },
      { item: 'Какао-порошок', amount: '30 г' },
      { item: 'Ликёр Амаретто', amount: '2 ст.л. (опционально)' },
    ],
    description: 'Классический итальянский десерт без выпечки с кофейной пропиткой и нежным сырным кремом.',
    steps: [
      { step: 1, text: 'Разделите яйца на белки и желтки. Взбейте желтки с сахаром до светлой пышной массы.', time: 5 },
      { step: 2, text: 'Добавьте маскарпоне к желткам и аккуратно перемешайте до однородности.', time: 3 },
      { step: 3, text: 'Взбейте белки до устойчивых пиков. Аккуратно введите в сырную массу.', time: 7 },
      { step: 4, text: 'Сварите крепкий кофе, остудите. По желанию добавьте ликёр.', time: 5 },
      { step: 5, text: 'Быстро обмакивайте печенье в кофе и выкладывайте первый слой в форму.', time: 5 },
      { step: 6, text: 'Покройте половиной крема, затем второй слой печенья и оставшийся крем.', time: 5 },
      { step: 7, text: 'Посыпьте какао и охладите минимум 4 часа, лучше на ночь.', time: 240 },
    ],
    tips: [
      'Не перемачивайте печенье — оно должно остаться слегка хрустящим',
      'Используйте настоящий маскарпоне, не заменяйте другим сыром',
      'Чем дольше тирамису стоит, тем насыщеннее вкус',
    ],
  },
];

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const recipe = recipesData.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Рецепт не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const toggleStep = (stepNumber: number) => {
    setCheckedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Назад к рецептам
            </Button>
            <h1 className="text-2xl font-bold text-primary">Сладкая Кухня</h1>
          </div>
        </nav>
      </header>

      <div className="relative h-[400px] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              {recipe.difficulty}
            </Badge>
            <h1 className="text-5xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-xl text-muted-foreground">{recipe.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Icon name="Clock" className="mx-auto mb-2 text-primary" size={32} />
                <p className="font-semibold">Время</p>
                <p className="text-muted-foreground">{recipe.time} минут</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Icon name="Users" className="mx-auto mb-2 text-primary" size={32} />
                <p className="font-semibold">Порций</p>
                <p className="text-muted-foreground">{recipe.servings} шт</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Icon name="ChefHat" className="mx-auto mb-2 text-primary" size={32} />
                <p className="font-semibold">Сложность</p>
                <p className="text-muted-foreground">{recipe.difficulty}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-bold mb-6">Ингредиенты</h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="text-lg">{ingredient.item}</span>
                    <span className="text-lg font-semibold text-primary">
                      {ingredient.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Приготовление</h2>
                <p className="text-sm text-muted-foreground">
                  Выполнено: {checkedSteps.length} из {recipe.steps.length}
                </p>
              </div>
              <div className="space-y-6">
                {recipe.steps.map((step) => (
                  <div
                    key={step.step}
                    className={`flex gap-4 p-4 rounded-lg border-2 transition-all ${
                      checkedSteps.includes(step.step)
                        ? 'bg-accent/20 border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Checkbox
                      checked={checkedSteps.includes(step.step)}
                      onCheckedChange={() => toggleStep(step.step)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <Badge variant="outline">
                          <Icon name="Clock" className="mr-1" size={14} />
                          {step.time} мин
                        </Badge>
                      </div>
                      <p
                        className={`text-lg ${
                          checkedSteps.includes(step.step)
                            ? 'line-through text-muted-foreground'
                            : ''
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <Icon name="Lightbulb" className="text-primary mt-1" size={24} />
                <h2 className="text-2xl font-bold">Полезные советы</h2>
              </div>
              <ul className="space-y-3">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-lg">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Посмотреть другие рецепты
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
