# this makefile is kinda broken, atm run make clean pretty much every time
objects=main.o 
main: $(objects) # 	
	g++ -std=c++11 $(objects) -o main -lsfml-audio -lsfml-graphics -lsfml-window -lsfml-system
	./main
main.o: main.cpp
	g++ -std=c++11 -c main.cpp
clean:
	rm -f *.o
	rm -f main

