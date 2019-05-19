
def permute(arr):
    lastLevel = [[arr[i]] for i in range(len(arr))]
    while len(lastLevel[0]) < len(arr):
        nextLevel = []
        for soFar in lastLevel:
            for toAdd in arr:
                if soFar.count(toAdd) < arr.count(toAdd):
                    nextLevel.append(soFar + [toAdd])
        lastLevel = nextLevel
    return lastLevel

result = permute(list("firefly"))
for x in result:
    print("".join(x))

