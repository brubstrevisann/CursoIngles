import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';
import { Event } from '@angular/router';



@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  public frases: Frase[] = FRASES;
  public instrucao = 'Traduza a frase:' ;
  public resposta = '';
  public rodada = 0;
  public rodadaFrase: Frase;
  public progresso = 0;
  public tentativas = 5;

 
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizadaRodada();
    
   // console.log(this.rodadaFrase);
}
  ngOnInit() {} 
  
     
 

  atualizaResposta(valor) {
    this.resposta = valor;
    // console.log(this.resposta);
    //document.getElementById('txtArea')
  }

  verificaResposta(): void {
    // console.log(this.tentativas);
    
    if (this.rodadaFrase.frasePtBr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'') === this.resposta.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'')   ){
     // alert( 'A tradução está correta!' );
      // Trocar pergunta da rodada
      this.rodada++;

      // Atualiza o objeto rodadaFrase
      this.atualizadaRodada();      
      // Determina o percentual do progresso
      this.progresso = this.progresso + (100 / this.frases.length);
  } else {
      // alert('A tradução está incorreta!');
      // diminuir os corações
        this.tentativas--;

        if ( this.tentativas === -1 ) {
          this.encerrarJogo.emit('derrota');
        }
  }
      
    if (this.rodada === 8 ) {
      this.encerrarJogo.emit('vitoria');
    }

    }

  atualizadaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
 

}
