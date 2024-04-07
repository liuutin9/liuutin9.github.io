close all;clear all;clc;
%To use this code, please uncomment the part you want to execute before you
%actually run it.
%Use "%" or ctrl+r to comment your code, ctrl+t to uncomment.

%%%%%%%%%%%%%%%%Part 1%%%%%%%%%%%%%%%%
% x=2*100
% y=2*100; %Add semicolon will not show the result
% disp(y); %Other way to print your result on command window

%%%Matrix definition
% a=[1 2 3 4] %1*4
% b=[1 2;3 4] %2*2

%%%Some useful matrixs
% c=zeros(1,4)
% d=ones(1,4)
% e=rand(1,4)
% f=randn(1,4)

%%%Mathematic functions
% aa=abs(-4)
% bb=log(5)
% cc=log10(5)
% dd=max([3 1 2 5])
% ff=exp(10)
% xr=real([1+j;3-2j])
% xi=imag([1+j;3-2j])


%%Math operations
% aaa=[1 2; 3 4]
% bbb=[1 2; 4 8]
% ccc=aaa*bbb
% ddd=aaa.*bbb
% eee=aaa^2
% fff=aaa.^2
% ggg=aaa+1
% hhh=1./aaa


%%%Loop 
% x=0;
% for i=1:10
%     x=x+i;
% end
% x

%%%Conditional statement
% x=-1;
% if x<0
%     y=1;
% elseif x==0
%     y=0;
% else
%     y=-1;
% end
% y


% %%%Plot a function
% fs=100; % Sample frequency
% f=1; % Frequency of sin
% x=sin(2*pi*[0:1/fs:3]);
% figure('Name','Results(plot)','NumberTitle','off');
% plot([0:1/fs:3],x);
% title('Sin Example');
% figure('Name','Results(stem)','NumberTitle','off');
% stem([0:1/fs:3],x,'LineStyle','none');
% title('Sin Example');





%%%%%%%%%%%%%%%%%Part 2(Convolution)%%%%%%%%%%%%%%%%
% t = -5:1:5;
% 
% % initialize
% unitstep = zeros(size(t));
% ramp = zeros(size(t));
% squafunc = zeros(size(t)); 
% 
% unitstep(t>=0) = 1;
% ramp = t.*unitstep;
% squafunc(-1<=t &t <=1) = 1; %squarewave(-1<=t<=1)
% 
% figure('Name','Functions','NumberTitle','off');
% stem(t,unitstep)
% hold on
% stem(t,ramp)
% stem(t,squafunc)
% hold off
% legend('unitstep','ramp','squafunc');
% 
% figure('Name','Convolution of squawave','NumberTitle','off');
% a=squafunc;
% b=squafunc;
% c=conv(a,b);
% stem(c);





