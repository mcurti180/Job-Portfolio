word_set = set()
word_list = []

with open('words_file.txt', 'r') as file:
    for line in file:
        word = line.strip()
        if len(word) in [4, 5, 6]:
            #word_set.add(word)
            word_list.append(word)

with open('words_list.txt', 'w') as file:
    word_list.sort()
    for word in word_list:
        file.write(f"'{word}'" + ',\n')

if __name__ == '__main__':
    print('fate' in word_list)
    print(len(word_list))
    #print(word_list)