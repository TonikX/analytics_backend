import os
from collections import defaultdict
from surprise import SVD, Dataset, Reader
from surprise.model_selection import cross_validate
import pandas as pd

from dataprocessing.models import Items, User
from selection_of_keywords_for_rpd.models import RecommendationOfPrerequisitesFoUser


def get_top_n(predictions, n=10):
    """Return the top-N recommendation for each user from a set of predictions.

    Args:
        predictions(list of Prediction objects): The list of predictions, as
            returned by the test method of an algorithm.
        n(int): The number of recommendation to output for each user. Default
            is 10.

    Returns:
    A dict where keys are user (raw) ids and values are lists of tuples:
        [(raw item id, rating estimation), ...] of size n.
    """

    # First map the predictions to each user.
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid, est))

    # Then sort the predictions for each user and retrieve the k highest ones.
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]

    return top_n


# path to dataset file
file_path = os.path.expanduser("selection_of_keywords_for_rpd/recommendation_of_prerequisites/data/output.tsv")

df = pd.read_csv(file_path)
df.to_csv(file_path, index=False)
print(file_path)

# As we're loading a custom dataset, we need to define a reader. In the
# movielens-100k dataset, each line has the following format:
# 'user item rating timestamp', separated by '\t' characters.
reader = Reader(line_format="user item rating", sep="\t")

data = Dataset.load_from_file(file_path, reader=reader)

# First train an SVD algorithm on the movielens dataset.
trainset = data.build_full_trainset()
algo = SVD()
algo.fit(trainset)
# Run 5-fold cross-validation and print results
cross_validate(algo, data, measures=["RMSE", "MAE"], cv=5, verbose=True)
# Than predict ratings for all pairs (u, i) that are NOT in the training set.
testset = trainset.build_anti_testset()
predictions = algo.test(testset)

top_n = get_top_n(predictions, n=10)

# Print the recommended items for each user
for uid, user_ratings in top_n.items():
    user = User.objects.get(id=uid)
    print(uid, [iid for (iid, _) in user_ratings])
    for iid in [iid for (iid, _) in user_ratings]:
        RecommendationOfPrerequisitesFoUser.objects.create(user=user, item=Items.objects.get(id=iid))

# We can now use this dataset as we please, e.g. calling cross_validate
# cross_validate(algo, data, measures=["RMSE", "MAE"], cv=5, verbose=True)
