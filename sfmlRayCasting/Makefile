# this makefile is kinda broken, atm run make clean pretty much every time
objects=main.o Yiffler.o World.o Barrier.o
main: $(objects) # Yiffler.hpp World.hpp Barrier.hpp
	g++ -std=c++11 $(objects) -o main -lsfml-audio -lsfml-graphics -lsfml-window -lsfml-system
	./main
main.o: main.cpp
	g++ -std=c++11 -c main.cpp
Yiffler.o: Yiffler.cpp Yiffler.hpp
	g++ -std=c++11 -c Yiffler.cpp
World.o: World.cpp World.hpp
	g++ -std=c++11 -c World.cpp
Barrier.o: Barrier.cpp Barrier.hpp
	g++ -std=c++11 -c Barrier.cpp
clean:
	rm -f *.o
	rm -f main
