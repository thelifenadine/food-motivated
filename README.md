# Raw Dog Food Calculator / Meal Prep Assistant

Making your own dog food isn't rocket science, it's just a lot of math! The goal of this app is to help dog owners quickly calculate what they need for one meal, or a month of meals. Here is an overview of what's involved.

First you need your basic options - do you want to measure your food in grams or ounces? How much food should your dog eat each day? This is calculated as a percentage of the dog's body weight. The percentage is typically determined based on how active the dog is. Puppies need a much higher percentage as they are growing. Most dogs are in the 2-3% range, 2 being less active and 3 being more active.

`weight * maintenance = total amount to be fed per day`

Then we get into what type of raw diet you want to feed. Most DIY raw feeders follow either a BARF diet (biologically appropriate raw foods) or a PMR diet (prey model raw). The BARF diet includes things like veggies while the PMR diet requires more creativity to meet nutrient deficiencies. There are commonly accepted ratios associated with each diet type and subtle variations required to meet the needs of growing puppies.

For example:
| Diet Type | muscle meat | raw bone | liver | organ | other |
| ----------- | ----------- | ----------- | ----------- |  ----------- |  ----------- |
| BARF | 70% | 10% | 5% | 5% | 10% |
| PMR | 78% | 10% | 5% | 5% | 2% |

Another variable is bone, which is fed for calcium. Bones from different parts of each animal have varying percentages of meat to muscle. For example, chicken feet are estimated at 60% bone while the chicken thigh has much more muscle meat attached to it at 21%. This is taken into account when calculating the amounts of bone and muscle meat to feed.

`total amount to be fed * percentage of item = amount to feed of that item`

There are essential nutrient requirements which are commonly deficient in a raw diet. The recommended amounts are estimated based on caloric intake per day. These should be carefully considered and ideally met through feeding whole foods, such as seeds and fish. The amount required per meal is based on the required calories per day and whether or not it's a puppy or adult.

The amount of calories per day are calculated by estimating the amount per 1000kcal.

| Unit | Amount | Calories |  1000 / amount = calories per unit |
| ----------- | ----------- | ----------- | ----------- |
| ounces | 19 | 1000kcal | 52.63 kcal per ounce |
| grams | 538 | 1000kcal | 1.86 kcal per gram |

`totalAmount * kcal per unit = estimated calories`

Since the recommended amount of each essential nutrient is based on 1000 calories of food, the caloric amount is then used to get the recommended amount of each essential nutrient. So if the meal requires 2000 calories, the recommended amounts should be doubled.

`estimatedCalories / 1000 = increase amount`

Each essential nutrient is multiplied by the recommended amount to get the amount required for each day.

`essential nutrient RA * increase amount = RA of essential nutrient per day`