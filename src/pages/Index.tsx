import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const recipes = [
  {
    id: 1,
    title: 'Медовик классический',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop',
    time: 60,
    difficulty: 'Средняя',
    ingredients: ['мёд', 'мука', 'яйца', 'сметана', 'сахар'],
    description: 'Нежный торт с тонкими коржами, пропитанными сметанным кремом',
  },
  {
    id: 2,
    title: 'Шоколадный брауни',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=600&fit=crop',
    time: 45,
    difficulty: 'Легкая',
    ingredients: ['шоколад', 'масло', 'яйца', 'мука', 'сахар', 'орехи'],
    description: 'Влажный и насыщенный шоколадный десерт с хрустящей корочкой',
  },
  {
    id: 3,
    title: 'Эклеры с заварным кремом',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&h=600&fit=crop',
    time: 90,
    difficulty: 'Сложная',
    ingredients: ['масло', 'мука', 'яйца', 'молоко', 'сахар', 'ваниль'],
    description: 'Французская классика с воздушным тестом и ванильным кремом',
  },
  {
    id: 4,
    title: 'Лимонный тарт',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&h=600&fit=crop',
    time: 75,
    difficulty: 'Средняя',
    ingredients: ['лимон', 'яйца', 'мука', 'масло', 'сахар'],
    description: 'Освежающий десерт с хрустящей основой и кремовой начинкой',
  },
  {
    id: 5,
    title: 'Макаруны ассорти',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&h=600&fit=crop',
    time: 120,
    difficulty: 'Сложная',
    ingredients: ['миндальная мука', 'яичный белок', 'сахар', 'пищевые красители'],
    description: 'Изящные французские печенья с нежной текстурой',
  },
  {
    id: 6,
    title: 'Тирамису',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    time: 30,
    difficulty: 'Легкая',
    ingredients: ['маскарпоне', 'савоярди', 'кофе', 'яйца', 'какао'],
    description: 'Итальянский десерт без выпечки с кофейной пропиткой',
  },
];

const testimonials = [
  {
    name: 'Анна Петрова',
    text: 'Медовик получился невероятно вкусным! Все гости просили рецепт. Спасибо за подробные инструкции!',
    rating: 5,
  },
  {
    name: 'Мария Иванова',
    text: 'Впервые пекла эклеры и всё получилось с первого раза. Рецепт очень понятный, буду готовить ещё!',
    rating: 5,
  },
  {
    name: 'Елена Смирнова',
    text: 'Брауни просто тает во рту! Идеальный рецепт для семейного чаепития.',
    rating: 5,
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    const matchesTime = selectedTime === 'all' || 
      (selectedTime === 'quick' && recipe.time <= 45) ||
      (selectedTime === 'medium' && recipe.time > 45 && recipe.time <= 90) ||
      (selectedTime === 'long' && recipe.time > 90);

    return matchesSearch && matchesDifficulty && matchesTime;
  });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Сладкая Кухня</h1>
            <div className="hidden md:flex gap-6">
              <a href="#home" className="hover:text-primary transition-colors">Главная</a>
              <a href="#recipes" className="hover:text-primary transition-colors">Рецепты</a>
              <a href="#about" className="hover:text-primary transition-colors">О мне</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="py-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">Домашняя кондитерская с любовью</h2>
            <p className="text-xl text-muted-foreground">
              Проверенные рецепты десертов, которые порадуют вашу семью и друзей. 
              Каждый рецепт создан с душой и протестирован на моей собственной кухне.
            </p>
            <Button size="lg" className="mt-4" onClick={() => document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })}>
              Посмотреть рецепты
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="Clock" className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="text-2xl font-bold mb-2">Быстро</h3>
                <p className="text-muted-foreground">Рецепты от 30 минут</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="Heart" className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="text-2xl font-bold mb-2">Проверено</h3>
                <p className="text-muted-foreground">Каждый рецепт опробован</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="Users" className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="text-2xl font-bold mb-2">Для всех</h3>
                <p className="text-muted-foreground">От новичков до профи</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="recipes" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Мои рецепты</h2>
          
          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск по названию или ингредиентам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedDifficulty}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="Легкая">Легкие</TabsTrigger>
                <TabsTrigger value="Средняя">Средние</TabsTrigger>
                <TabsTrigger value="Сложная">Сложные</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedTime === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTime('all')}
              >
                Все
              </Button>
              <Button
                variant={selectedTime === 'quick' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTime('quick')}
              >
                <Icon name="Zap" className="mr-2" size={16} />
                До 45 мин
              </Button>
              <Button
                variant={selectedTime === 'medium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTime('medium')}
              >
                <Icon name="Clock" className="mr-2" size={16} />
                45-90 мин
              </Button>
              <Button
                variant={selectedTime === 'long' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTime('long')}
              >
                <Icon name="Clock" className="mr-2" size={16} />
                Более 90 мин
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-2xl font-bold">{recipe.title}</h3>
                    <Badge variant="secondary">{recipe.difficulty}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{recipe.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      <span>{recipe.time} мин</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="ChefHat" size={16} />
                      <span>{recipe.ingredients.length} ингр.</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {ing}
                      </Badge>
                    ))}
                    {recipe.ingredients.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{recipe.ingredients.length - 4}
                      </Badge>
                    )}
                  </div>
                  
                  <Button className="w-full" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                    Смотреть рецепт
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-xl text-muted-foreground">Рецепты не найдены. Попробуйте другой запрос.</p>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop"
                  alt="О мне"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Привет! Я Анна</h2>
                <p className="text-lg">
                  Я влюбилась в кондитерское искусство 5 лет назад и с тех пор не могу остановиться. 
                  Моя миссия — показать, что создавать восхитительные десерты может каждый, 
                  независимо от уровня подготовки.
                </p>
                <p className="text-lg">
                  Здесь я делюсь только теми рецептами, которые много раз готовила сама и 
                  которые всегда получаются идеально. Присоединяйтесь к моей сладкой истории!
                </p>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" size="icon">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Youtube" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Facebook" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы читателей</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="fill-primary text-primary" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <p className="font-semibold">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Свяжитесь со мной</h2>
            <p className="text-lg text-muted-foreground">
              Есть вопрос о рецепте? Хотите поделиться своим результатом? 
              Буду рада вашим сообщениям!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="gap-2">
                <Icon name="Mail" size={20} />
                Написать письмо
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="MessageCircle" size={20} />
                Telegram
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Mail" className="mx-auto mb-2 text-primary" size={32} />
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-sm text-muted-foreground">anna@sweetkitchen.ru</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Instagram" className="mx-auto mb-2 text-primary" size={32} />
                  <p className="font-semibold mb-1">Instagram</p>
                  <p className="text-sm text-muted-foreground">@sweetkitchen</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="MapPin" className="mx-auto mb-2 text-primary" size={32} />
                  <p className="font-semibold mb-1">Город</p>
                  <p className="text-sm text-muted-foreground">Москва, Россия</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2024 Сладкая Кухня. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}