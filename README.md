[![Build Status](https://travis-ci.com/thelifenadine/food-motivated.svg?branch=master)](https://travis-ci.com/thelifenadine/food-motivated) [![Coverage Status](https://coveralls.io/repos/github/thelifenadine/food-motivated/badge.svg?branch=update-libraries)](https://coveralls.io/github/thelifenadine/food-motivated?branch=update-libraries)

# Raw Dog Food Calculator / Meal Prep Assistant

Making your own dog food is not simple, it involves a lot of math and research to make sure the dog is getting all of the recommended nutrients. The goal of this app is to help dog owners, who are already feeding raw, quickly calculate what they need for one meal, or a month of meals.

Basic options such as unit type, activity level, and the dog's weight are required to determine the daily amount. This amount is calculated as a percentage of the dog's body weight. The percentage is typically determined based on how active the dog is, however puppies need a much higher percentage as they are growing. Most dogs are in the 2-3% range, 2 being less active and 3 being more active.

`weight * maintenance = total amount to be fed per day`

Most DIY raw feeders follow either a BARF diet (biologically appropriate raw foods) or a PMR diet (prey model raw). The BARF diet includes veggies and seeds while the PMR diet requires using other venues to meet nutrient deficiencies. There are commonly accepted ratios associated with each diet type and variations required to meet the needs of growing puppies.

For example:
| Diet Type | muscle meat | raw bone | liver | organ | other (vegetables, fiber, etc) |
| ----------- | ----------- | ----------- | ----------- |  ----------- |  ----------- |
| BARF | 70% | 10% | 5% | 5% | 10% |
| PMR | 78% | 10% | 5% | 5% | 2% |

Another variable is bone, which is fed for calcium. Bones from different animal parts have varying ratios of meat to muscle. Chicken feet, for example, are estimated at 60% bone (40% muscle) while the chicken thigh has much more muscle meat attached to it at 21% bone to 79% muscle. This has to be taken into account when calculating the amounts of bone and muscle meat to feed.

`total amount to be fed * percentage of item = amount to feed of that item`

There are essential nutrient requirements which are commonly deficient in a raw diet. The recommended amounts are calculated based on caloric intake per day. These should be carefully considered and ideally met through feeding whole foods, such as seeds and fish. The amount required per meal is based on the estimated calories per day and also varies slightly for puppies vs adults.

The amount of calories per day are calculated by estimating the amount per 1000kcal.

| Unit | Amount | Calories |  1000 / amount = calories per unit |
| ----------- | ----------- | ----------- | ----------- |
| ounces | 19 | 1000kcal | 52.63 kcal per ounce |
| grams | 538 | 1000kcal | 1.86 kcal per gram |

`total amount per day * kcal per unit = estimated calories per day`

Since the recommended amount of each essential nutrient is based on 1000 calories of food, the caloric amount is then used to get the recommended amount of each essential nutrient. So if the meal requires 2000 calories, the recommended amounts for each essential nutrient should be doubled.

`estimatedCalories / 1000 = increase amount`

Each essential nutrient is multiplied by the recommended amount to get the amount required for each day.

`essential nutrient RA * increase amount = RA of essential nutrient per day`
