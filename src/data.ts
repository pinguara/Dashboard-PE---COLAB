import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'demandas',
    title: 'Demandas do Cidadão',
    description: 'O Colab é um aplicativo de participação cidadã que facilita a comunicação entre a população e o poder público. Seu objetivo é promover maior transparência e eficiência na gestão municipal.',
    initiatives: [
      'Realizar busca ativa de demandas em mídias sociais',
      'Aumentar o número de demandas na plataforma Colab'
    ],
    expectedResults: [
      'Reduzir demandas no Pendente/Encaminhado/Atendido',
      'Localizar demandas em páginas e perfis nas mídias sociais',
      'Tornar o Colab mais conhecido e utilizado pela população'
    ],
    goals: [
      {
        id: 'dem-1',
        meta: 'Aumentar a quantidade de solicitações de demandas',
        formula: 'Número de solicitações do ano anterior / Solicitações do ano',
        axis: 'Eixo 1 - Cobertura de demandas',
        indicators: { 2025: 30000, 2026: 33000, 2027: 37000, 2028: 40000 }
      },
      {
        id: 'dem-2',
        meta: 'Captar demandas em mídias sociais',
        formula: 'Aumentar a presença em redes sociais',
        axis: 'Eixo 1 - Cobertura de demandas',
        indicators: { 2025: 200, 2026: 200, 2027: 200, 2028: 200 }
      },
      {
        id: 'dem-3',
        meta: 'Reduzir demandas no Pendente',
        formula: 'Número de demandas no pendente',
        axis: 'Eixo 2 - Metas Status em quantidade',
        indicators: { 2025: 0, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'dem-4',
        meta: 'Reduzir demandas no encaminhado',
        formula: '(total de demandas no encaminhado/Total de demandas) x100',
        axis: 'Eixo 2 - Metas Status em quantidade',
        indicators: { 2025: '<0,5%', 2026: '<0,4%', 2027: '<0,4%', 2028: '<0,4%' }
      },
      {
        id: 'dem-5',
        meta: 'Reduzir demandas no em atendimento',
        formula: '(total de demandas no em atendimento/Total de demandas) x100',
        axis: 'Eixo 2 - Metas Status em quantidade',
        indicators: { 2025: '<2,5%', 2026: '<2,5%', 2027: '<2,5%', 2028: '<2,5%' }
      },
      {
        id: 'dem-6',
        meta: 'Não ter demandas no status atendido',
        formula: '(total de demandas no atendido/Total de demandas) x100',
        axis: 'Eixo 2 - Metas Status em quantidade',
        indicators: { 2025: '<0,1%', 2026: '<0,1%', 2027: '<0,1%', 2028: '<0,1%' }
      },
      {
        id: 'dem-7',
        meta: 'Manter demandas no resolvido',
        formula: '(total de demandas no resolvido/Total de demandas) x100',
        axis: 'Eixo 2 - Metas Status em quantidade',
        indicators: { 2025: '≥93%', 2026: '≥93%', 2027: '≥93%', 2028: '≥93%' }
      },
      {
        id: 'dem-8',
        meta: 'Manter taxa de Demandas recusadas e demandas indeferidas abaixo da meta',
        formula: '(total de demandas no status indeferidos + total de demandas no status recusado/Total de demandas) x100',
        axis: 'Eixo 2 - Metas Status em quantidade',
        indicators: { 2025: '≤5%', 2026: '≤5%', 2027: '≤5%', 2028: '≤5%' }
      },
      {
        id: 'dem-9',
        meta: 'Reduzir demandas pendentes em dias',
        formula: 'Número de demandas no pendente',
        axis: 'Eixo 3 - Metas Status em dias',
        indicators: { 2025: 0, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'dem-10',
        meta: 'Reduzir demandas no encaminhado em dias',
        formula: 'Número de dias desde que a demanda foi encaminhada',
        axis: 'Eixo 3 - Metas Status em dias',
        indicators: { 2025: 15, 2026: 11, 2027: 9, 2028: 7 }
      },
      {
        id: 'dem-11',
        meta: 'Não ter demandas no atendido em dias',
        formula: 'Número de dias desde que a demanda foi colocada no status atendido.',
        axis: 'Eixo 3 - Metas Status em dias',
        indicators: { 2025: 1, 2026: 1, 2027: 1, 2028: 1 }
      },
      {
        id: 'dem-12',
        meta: 'Diminuir Tx de demandas há mais de 1 ano na secretaria de Serviços Públicos',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.1 - Metas de Demandas Antigas - Serviços Públicos',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-12.1',
        meta: 'Diminuir Tx de demandas há mais de 1 ano - Dinâmica',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.1 - Metas de Demandas Antigas - Serviços Públicos',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-12.2',
        meta: 'Diminuir Tx de demandas há mais de 1 ano - Chatuba',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.1 - Metas de Demandas Antigas - Serviços Públicos',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-12.3',
        meta: 'Diminuir Tx de demandas há mais de 1 ano - Coreia',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.1 - Metas de Demandas Antigas - Serviços Públicos',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-12.4',
        meta: 'Diminuir Tx de demandas há mais de 1 ano - Urbanismo',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.1 - Metas de Demandas Antigas - Serviços Públicos',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-12.5',
        meta: 'Diminuir Tx de demandas há mais de 1 ano - Trânsito',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.2 - Metas de Demandas Antigas - Segurança Pública, Defesa Civil e Mobilidade Urbana',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-12.6',
        meta: 'Diminuir Tx de demandas há mais de 1 ano - Defesa Civil',
        formula: '(Número de demandas em aberto com mais de 365 dias/ número de demandas em aberto)x100',
        axis: 'Eixo 4.2 - Metas de Demandas Antigas - Segurança Pública, Defesa Civil e Mobilidade Urbana',
        indicators: { 2025: '25%', 2026: '21%', 2027: '18%', 2028: '15%' }
      },
      {
        id: 'dem-13.1',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Ouvidoria da Saúde',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.2',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Atenção Primária',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.3',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Atenção Especializada',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.4',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Regulação',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.5',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Vigilância Sanitária',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.6',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Vigilância Epidemiológica',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.7',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - Vigilância Ambiental',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-13.8',
        meta: 'Diminuir Tx de demandas há mais de 6 meses - CEO',
        formula: '(Número de demandas em aberto com mais de 6 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4.3 - Metas de Demandas Antigas - Saúde',
        indicators: { 2025: '25%', 2026: '20%', 2027: '17%', 2028: '14%' }
      },
      {
        id: 'dem-14.1',
        meta: 'Diminuir Tx de demandas há mais de 3 meses - Fazenda',
        formula: '(Número de demandas em aberto com mais de 3 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4 - Metas de Demandas Antigas - Demais secretarias',
        indicators: { 2025: '35%', 2026: '30%', 2027: '25%', 2028: '20%' }
      },
      {
        id: 'dem-14.2',
        meta: 'Diminuir Tx de demandas há mais de 3 meses - Mesquita PREV',
        formula: '(Número de demandas em aberto com mais de 3 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4 - Metas de Demandas Antigas - Demais secretarias',
        indicators: { 2025: '35%', 2026: '30%', 2027: '25%', 2028: '20%' }
      },
      {
        id: 'dem-14.3',
        meta: 'Diminuir Tx de demandas há mais de 3 meses - SUBAS',
        formula: '(Número de demandas em aberto com mais de 3 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4 - Metas de Demandas Antigas - Demais secretarias',
        indicators: { 2025: '35%', 2026: '30%', 2027: '25%', 2028: '20%' }
      },
      {
        id: 'dem-14.4',
        meta: 'Diminuir Tx de demandas há mais de 3 meses - SEMCELT',
        formula: '(Número de demandas em aberto com mais de 3 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4 - Metas de Demandas Antigas - Demais secretarias',
        indicators: { 2025: '35%', 2026: '30%', 2027: '25%', 2028: '20%' }
      },
      {
        id: 'dem-14.5',
        meta: 'Diminuir Tx de demandas há mais de 3 meses - SEMED',
        formula: '(Número de demandas em aberto com mais de 3 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4 - Metas de Demandas Antigas - Demais secretarias',
        indicators: { 2025: '35%', 2026: '30%', 2027: '25%', 2028: '20%' }
      },
      {
        id: 'dem-14.6',
        meta: 'Diminuir Tx de demandas há mais de 3 meses - SEMSOP',
        formula: '(Número de demandas em aberto com mais de 3 meses/ número de demandas em aberto)x100',
        axis: 'Eixo 4 - Metas de Demandas Antigas - Demais secretarias',
        indicators: { 2025: '35%', 2026: '30%', 2027: '25%', 2028: '20%' }
      }
    ]
  },
  {
    id: 'satisfacao',
    title: 'Pesquisa de Satisfação',
    description: 'Ferramenta utilizada para medir o nível de contentamento dos munícipes, usuários dos aplicativos e colaboradores da prefeitura em relação aos serviços prestados.',
    initiatives: [
      'Implementar consultas públicas pelo Whatsapp'
    ],
    expectedResults: [
      'Obter os dados sobre as consultas públicas',
      'Ampliar o número de participações',
      'Analisar e extrair as respostas para resolução de demandas',
      'Responder aos munícipes com retorno das consultas públicas'
    ],
    goals: [
      {
        id: 'sat-1',
        meta: 'Implementar as consultas públicas no whatsapp',
        formula: 'Status de implementação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'sat-2',
        meta: 'Implementar os resultados das consultas públicas',
        formula: 'Status de implementação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'sat-3',
        meta: 'Aumentar o número de consultas públicas disponibilizadas pelo whatsapp',
        formula: 'Quantidade de consultas',
        indicators: { 2025: 4, 2026: 10, 2027: 10, 2028: 5 }
      },
      {
        id: 'sat-4',
        meta: 'Ampliar o número respostas às consultas públicas',
        formula: 'quantidade de pessoas respondendo por uma pesquisa (cada)',
        indicators: { 2025: 200, 2026: 500, 2027: 800, 2028: 1500 }
      },
      {
        id: 'sat-5',
        meta: 'Aumentar o número de consultas públicas (Geral)',
        formula: 'Número de consultas do ano/Número de consultas ano anterior',
        axis: 'Aplicativo Colab Cidadão',
        indicators: { 2025: 5, 2026: 6, 2027: 7, 2028: 8 }
      },
      {
        id: 'sat-6',
        meta: 'Ampliar o número respostas às consultas públicas (Geral)',
        formula: 'quantidade de pessoas respondendo por cada pesquisa',
        axis: 'Aplicativo Colab Cidadão',
        indicators: { 2025: 200, 2026: 300, 2027: 400, 2028: 500 }
      }
    ]
  },
  {
    id: 'aprimoramento',
    title: 'Aprimoramento dos Serviços Públicos',
    description: 'Visa melhorar e expandir os serviços prestados à comunidade mesquitense através de uma estrutura organizacional interna eficiente.',
    initiatives: [
      'Implementar visitas',
      'Oferecer treinamentos',
      'Revisar Matriz de Responsabilidade e categorias',
      'Fomentar Relacionamento de demandas externas'
    ],
    expectedResults: [
      'Auxiliar na compreensão de demandas e identificar áreas de melhoria',
      'Promover melhorias nos serviços prestados',
      'Acompanhar os TRCS responsáveis por cada categoria',
      'Realizar contato cotidiano com outras repartições'
    ],
    goals: [
      {
        id: 'apr-1',
        meta: 'Aumentar o número de visitas e treinamentos aos departamentos',
        formula: 'Números de visitas realizadas mensalmente.',
        indicators: { 2025: 40, 2026: 50, 2027: 63, 2028: 80 }
      },
      {
        id: 'apr-2',
        meta: 'Revisar Matriz de Responsabilidade e categorias',
        formula: 'Atualizar mensalmente.',
        indicators: { 2025: 12, 2026: 12, 2027: 12, 2028: 12 }
      },
      {
        id: 'apr-3',
        meta: 'Reestruturar a Análise do 5%',
        formula: 'Anualmente',
        indicators: { 2025: 1, 2026: 1, 2027: 1, 2028: 1 }
      },
      {
        id: 'apr-4',
        meta: 'Aprimorar os envios dos feedbacks mensais',
        formula: 'Anualmente',
        indicators: { 2025: 1, 2026: 1, 2027: 1, 2028: 1 }
      },
      {
        id: 'apr-5',
        meta: 'Aumentar o número de Visitas (Geral)',
        formula: 'Número de visitas realizadas por ano',
        indicators: { 2025: 15, 2026: 20, 2027: 25, 2028: 30 }
      },
      {
        id: 'apr-6',
        meta: 'Realizar reuniões de CAC',
        formula: 'Números de reuniões CAC',
        indicators: { 2025: 4, 2026: 4, 2027: 4, 2028: 4 }
      },
      {
        id: 'apr-7',
        meta: 'Aumentar o número de treinamentos de usuários (individuais)',
        formula: 'Número de treinamentos/ número de treinamentos do ano anterior.',
        indicators: { 2025: 30, 2026: 35, 2027: 40, 2028: 45 }
      },
      {
        id: 'apr-8',
        meta: 'Revisar a matriz de Responsabilidades (Geral)',
        formula: 'Número de revisões.',
        indicators: { 2025: 15, 2026: 15, 2027: 15, 2028: 15 }
      },
      {
        id: 'apr-9',
        meta: 'Revisar a lista de secretarias e departamentos',
        formula: '-1 vez ao ano.',
        indicators: { 2025: 1, 2026: 1, 2027: 1, 2028: 1 }
      },
      {
        id: 'apr-10',
        meta: 'Implementar as consultas públicas no whatsapp',
        formula: 'Status de implementação',
        axis: 'Colab no WhatsApp',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'apr-11',
        meta: 'Implementar os resultados das consultas públicas',
        formula: 'Status de implementação',
        axis: 'Colab no WhatsApp',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'apr-12',
        meta: 'Aumentar o número de consultas públicas disponibilizadas pelo whatsapp',
        formula: 'Quantidade de consultas',
        axis: 'Colab no WhatsApp',
        indicators: { 2025: 4, 2026: 10, 2027: 10, 2028: 5 }
      },
      {
        id: 'apr-13',
        meta: 'Ampliar o número respostas às consultas públicas',
        formula: 'quantidade de pessoas respondendo por uma pesquisa (cada)',
        axis: 'Colab no WhatsApp',
        indicators: { 2025: 200, 2026: 500, 2027: 800, 2028: 1500 }
      }
    ]
  },
  {
    id: 'cartas',
    title: 'Cartas de Serviços',
    description: 'Informa sobre os processos de solicitação de serviços, garantindo eficiência, transparência e conhecimento sobre as funções da administração pública.',
    initiatives: [
      'Promover conversas com todas as secretarias e subsecretarias',
      'Desenvolver a descrição das cartas a partir da coleta de informações',
      'Disponibilizar as cartas de serviços revisadas',
      'Mapear e monitorar os meios os quais as cartas serão disponibilizadas'
    ],
    expectedResults: [
      'Aumentar a cobertura de serviços mapeados',
      'Implementar o site das cartas de serviços',
      'Realizar atualizações anualmente das cartas',
      'Acessar as cartas de serviços em diferentes plataformas digitais'
    ],
    goals: [
      {
        id: 'car-1',
        meta: 'Aumentar a cobertura de serviços mapeados',
        formula: 'número de cartas de serviços criadas e aprovadas',
        indicators: { 2025: 200, 2026: 200, 2027: 200, 2028: 200 }
      },
      {
        id: 'car-2',
        meta: 'Implementar uma aba no site da Prefeitura de Mesquita',
        formula: 'Status de implementação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'car-3',
        meta: 'Implementar as cartas de serviço no site da Transparência',
        formula: 'Status de implementação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'car-4',
        meta: 'Atualizar as cartas de serviços',
        formula: '(Número de cartas atualizadas / número de cartas totais) x 100',
        indicators: { 2025: '20%', 2026: '50%', 2027: '50%', 2028: '50%' }
      }
    ]
  },
  {
    id: 'usuarios',
    title: 'Usuários',
    description: 'Gestão da base de usuários, garantindo a ampliação contínua e a manutenção de um cadastro atualizado para melhor comunicação.',
    initiatives: [
      'Aumentar a base de usuários existentes',
      'Manter os dados cadastrais atualizados',
      'Ter um novo CRM de dados'
    ],
    expectedResults: [
      'Obter um crescimento percentual significativo no número de usuários cadastrados',
      'Garantir que os usuários estejam corretos e atualizados regularmente',
      'Adotar um sistema de CRM moderno e funcional'
    ],
    goals: [
      {
        id: 'usu-1',
        meta: 'Aumentar a base de usuários existentes',
        formula: 'Número de usuários do ano atual - Número de usuários do ano anterior >= meta',
        indicators: { 2025: 5230, 2026: 4350, 2027: 3200, 2028: 4000 }
      },
      {
        id: 'usu-2',
        meta: 'Manter os dados cadastrais atualizados',
        formula: 'Número total de usuários atualizados no ano',
        indicators: { 2025: 9000, 2026: 10800, 2027: 12420, 2028: 13920 }
      },
      {
        id: 'usu-3',
        meta: 'Atualizar CRM',
        formula: 'Status de atualização',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      }
    ]
  },
  {
    id: 'digitais',
    title: 'Serviços Digitais',
    description: 'Soluções oferecidas por meios de plataformas online que permitem a realização de atividades e facilitam o acesso a informações.',
    initiatives: [
      'Aumentar o número de serviços digitais'
    ],
    expectedResults: [
      'Obter novos serviços digitais para os munícipes'
    ],
    goals: [
      {
        id: 'dig-1',
        meta: 'Aumentar o número de departamentos com serviços no Colab',
        formula: 'Quantidade de departamentos',
        indicators: { 2025: 2, 2026: 2, 2027: 2, 2028: 1 }
      },
      {
        id: 'dig-2',
        meta: 'Aumentar o número de serviços digitais disponíveis',
        formula: 'Quantidade de serviços',
        indicators: { 2025: 3, 2026: 3, 2027: 3, 2028: 3 }
      }
    ]
  },
  {
    id: 'campo',
    title: 'Aplicativo de Campo',
    description: 'Desenvolvido exclusivamente para o uso de servidores a fim de facilitar e aperfeiçoar a criação de demandas no local e em tempo real.',
    initiatives: [
      'Implementar nas Secretarias',
      'Aumentar número de treinamentos destinado aos servidores',
      'Ampliar o quantitativo de demandas criadas através do App de Campo'
    ],
    expectedResults: [
      'Ter as secretarias utilizando o App, diminuindo o uso de papel',
      'Diminuir o lapso de tempo de execução do serviço'
    ],
    goals: [
      {
        id: 'cam-1',
        meta: 'Implementar o uso do App nos departamentos',
        formula: 'Quantidade de departamentos',
        indicators: { 2025: 2, 2026: 2, 2027: 2, 2028: 1 }
      },
      {
        id: 'cam-2',
        meta: 'Ampliar o quantitativo de demandas tratadas pelo App',
        formula: 'NÚMERO DE DEMANDAS TRATADAS NO APP DE CAMPO / NÚMERO DE DEMANDAS RESOLVIDAS NO ANO * 100',
        indicators: { 2025: '1,5%', 2026: '4%', 2027: '7,5%', 2028: '10%' }
      },
      {
        id: 'cam-3',
        meta: 'Aumentar número de treinamentos destinado aos servidores',
        formula: 'Quantidade de treinamentos',
        indicators: { 2025: 5, 2026: 10, 2027: 15, 2028: 20 }
      }
    ]
  },
  {
    id: 'kids',
    title: 'Colab Kids',
    description: 'Projeto que pretende disponibilizar o acesso ao aplicativo dentro de escolas municipais para crianças e jovens.',
    initiatives: [
      'Fazer um estudo de viabilidade do projeto',
      'Criar de materiais para elucidar o projeto',
      'Disponibilizar aparelhos que tenham acesso a internet nas escolas',
      'Acessar o aplicativo Colab nos aparelhos',
      'Palestrar e ministrar aulas nas escolas',
      'Implementar o projeto da escola piloto'
    ],
    expectedResults: [
      'Ampliar do acesso ao aplicativo Colab para munícipes de todas as idades',
      'Identificar solicitações de demandas específicas para crianças e jovens',
      'Obter dados e análise dos resultados da escola piloto'
    ],
    goals: [
      {
        id: 'kid-1',
        meta: 'Planejar e desenvolver estudos do projeto',
        formula: 'Status de planejamento',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'kid-2',
        meta: 'Acompanhar o desenvolvimento do aplicativo',
        formula: 'Status de acompanhamento',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'kid-3',
        meta: 'Compor o material para apresentação nas escolas',
        formula: 'Status de composição',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'kid-4',
        meta: 'Apresentar o projeto para a Escola Piloto',
        formula: 'Status de apresentação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'kid-5',
        meta: 'Implementar em Escola Piloto',
        formula: 'Status de implementação',
        indicators: { 2025: 0, 2026: 1, 2027: 0, 2028: 0 }
      },
      {
        id: 'kid-6',
        meta: 'Analisar os dados coletados da implementação da Escola Piloto',
        formula: 'Status de análise',
        indicators: { 2025: 0, 2026: 0, 2027: 1, 2028: 0 }
      },
      {
        id: 'kid-7',
        meta: 'Implementar em todas as escolas',
        formula: 'Quantidade de escolas',
        indicators: { 2025: 0, 2026: 0, 2027: 4, 2028: 4 }
      }
    ]
  },
  {
    id: 'dash',
    title: 'Novo Dash de dados',
    description: 'Ferramenta visual que reúne e exibe informações de maneira clara e organizada, com o objetivo de facilitar a análise e a tomada de decisões.',
    initiatives: [
      'Criar um dashboard de dados',
      'Confeccionar e oferecer materiais explicativos'
    ],
    expectedResults: [
      'Melhoria na compreensão e exploração de dados',
      'Aprimoramento na identificação de problemas',
      'Disponibilizar o dashboard de dados no portal de transparência'
    ],
    goals: [
      {
        id: 'dsh-1',
        meta: 'Implementar dashboard de dados',
        formula: 'Status de implementação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'dsh-2',
        meta: 'Criar material explicativo',
        formula: 'Status de criação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'dsh-3',
        meta: 'Disponibilizar dashboard no portal de transparência',
        formula: 'Status de disponibilização',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'dsh-4',
        meta: 'Atualizar anualmente o dashboard',
        formula: 'Status de atualização',
        indicators: { 2025: 0, 2026: 1, 2027: 1, 2028: 1 }
      }
    ]
  },
  {
    id: 'bot',
    title: 'Adote um Bot',
    description: 'O bot de atendimento no WhatsApp é uma ferramenta automatizada que facilita a interação com clientes de forma rápida e eficiente.',
    initiatives: [
      'Aumentar a entrega de projetos',
      'Criar um dashboard de dados separado por secretária',
      'Criar repositório de mensagem e projetos'
    ],
    expectedResults: [
      'Aumentar a disponibilidade de serviços digitais à população',
      'Melhorar a comunicação entre a Prefeitura e o cidadão',
      'Tornar funcional e seguro o acesso aos dashboards de dados'
    ],
    goals: [
      {
        id: 'bot-1',
        meta: 'Aumentar o número de projetos entregues',
        formula: '(Número de projetos entregues no ano - Número de projetos entregues no ano anterior) >= indicador',
        indicators: { 2025: 40, 2026: 45, 2027: 48, 2028: 50 }
      },
      {
        id: 'bot-2',
        meta: 'Aumentar o número de mensagens ativas enviadas',
        formula: '(Número de mensagens ativas enviadas no ano - Número de mensagens ativas enviadas no ano anterior) X100',
        indicators: { 2025: '1 M', 2026: '1.2 M', 2027: '1.4 M', 2028: '1.8 M' }
      },
      {
        id: 'bot-3',
        meta: 'Aumentar o número de mensagens no modelo receptivo',
        formula: '(Número de mensagens receptivas enviadas no ano - Número de mensagens receptivas enviadas no ano anterior) X100',
        indicators: { 2025: '105.000', 2026: '195.000', 2027: '270.000', 2028: '336.000' }
      },
      {
        id: 'bot-4',
        meta: 'Aumentar o número de mensagens SMS',
        formula: '(Número de SMS enviadas no ano - Número de SMS enviadas no ano anterior) X100',
        indicators: { 2025: '1.1 M', 2026: '1.2 M', 2027: '1.3 M', 2028: '1.5 M' }
      },
      {
        id: 'bot-5',
        meta: 'Atualizar dados dos cidadãos',
        formula: 'Número de cidadãos que atualizaram seu cadastro no ano/ População da Cidade',
        indicators: { 2025: '168.000', 2026: '168.000', 2027: '168.000', 2028: '168.000' }
      },
      {
        id: 'bot-6',
        meta: 'Criar um dashboard',
        formula: 'Status de criação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'bot-7',
        meta: 'Criar um repositório de projetos e dados dos projetos',
        formula: 'Status de criação',
        indicators: { 2025: 1, 2026: 0, 2027: 0, 2028: 0 }
      },
      {
        id: 'bot-8',
        meta: 'Atualizar repositório de projetos e dados dos projetos',
        formula: 'Atualizar a cada semestre',
        indicators: { 2025: 0, 2026: 2, 2027: 2, 2028: 2 }
      }
    ]
  }
];
