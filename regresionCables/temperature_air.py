import matplotlib.pyplot as plt
import numpy as np

def temperature_air_one():
    temperature = np.array([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60])
    temp_rate  = np.array([1.22, 1.17, 1.12, 1.06, 1, 0.94, 0.87, 0.79, 0.71, 0.61, 0.5])

    plt.scatter(temperature,temp_rate, color='red')
    z = np.polyfit(temperature,temp_rate,2)
    p = np.poly1d(z)

    plt.plot(temperature,p(temperature), '--g')

 
    # Add a title
    plt.title('Wspolczynniki korygujace dla temperatury otaczajacego powietrza (YDY,YDYp, YKY)')

    # Add X and y Label
    plt.xlabel('temperatura [stopnie C]')
    plt.ylabel('wspolczynnik korygujacy')
 
    plt.grid(alpha =.6, linestyle ='--')

    plt.text(30,0.8,str(f"         {p}"))
    plt.show()

def temperature_air_two():

    temperature = np.array([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])
    temp_rate  = np.array([1.15, 1.12, 1.08, 1.04, 1, 0.96, 0.91, 0.87, 0.82, 0.76, 0.71, 0.65, 0.58, 0.5, 0.41])

    plt.scatter(temperature,temp_rate, color='red')
    z = np.polyfit(temperature,temp_rate,2)
    p = np.poly1d(z)

    plt.plot(temperature,p(temperature), '--g')

 
    # Add a title
    plt.title('Wspolczynniki korygujace dla temperatury otaczajacego powietrza (YKXS,YAKXS, N2XH)')

    # Add X and y Label
    plt.xlabel('temperatura [stopnie C]')

    plt.ylabel('wspolczynnik korygujacy')
 
    plt.grid(alpha =.6, linestyle ='--')

    plt.text(30,0.8,str(f"         {p}"))
    plt.show()
